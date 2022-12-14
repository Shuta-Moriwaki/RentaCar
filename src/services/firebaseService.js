import firebase from 'firebase/app';

// 新規会員登録のパーツ
export const postMember = async (name, email) => {
  let addMember = null;
  const docRef = firebase
    .firestore()
    .collection('members')
    .doc();
  const memberName = name;
  const memberEmail = email;

  // firestoreに送る会員データ
  const memberData = {
    memberName,
    memberEmail,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  docRef.set(memberData);
  addMember = {
    id: docRef.id,
    name: memberName,
    email: memberEmail,
  };

  return addMember;
};

// 新規予約登録のパーツ
export const postReserve = async (
  userId,
  userName,
  departureTime,
  returnTime,
  selected,
  selectedId,
) => {
  let addReservation = null;
  const usrId = userId;
  const usrName = userName;
  const depTime = departureTime;
  const retTime = returnTime;
  const selectedCar = selected;
  const carId = selectedId;

  // firestoreに送る予約データ
  const reservationData = {
    usrId,
    usrName,
    depTime,
    retTime,
    selectedCar,
    carId,
  };

  const docRef = firebase
    .firestore()
    .collection('reservations')
    .doc();
  docRef.set(reservationData);
  addReservation = {
    id: docRef.id,
    userId: usrId,
    userName: usrName,
    departureTime: depTime,
    returnTime: retTime,
    selected: selectedCar,
  };
  // lendingStatusを変更し、貸出重複を防ぐ
  await firebase
    .firestore()
    .collection('cars')
    .doc(carId)
    .update({
      lendingStatus: 'unavailable',
    });

  return addReservation;
};

// 会員一覧画面の表示パーツ(members配列を返す)
export const getMembers = async () => {
  // 現在のmembersの値を取得
  const membersInfo = await firebase
    .firestore()
    .collection('members')
    .orderBy('memberName')
    .get();
  const { docs } = membersInfo;

  const members = [];
  for (let i = 0; i < docs.length; i += 1) {
    const doc = docs[i];
    // data.memberNameとdata.memberEmailを変数に指定
    const { memberName, memberEmail } = doc.data();
    // 配列の再度に付け加える(.push)
    members.push({
      id: doc.id,
      name: memberName,
      email: memberEmail,
    });
  }
  // members配列をreturn
  return members;
};

// 車両選択一覧(list)
export const getList = async () => {
  const list = [];
  const carList = await firebase
    .firestore()
    .collection('cars')
    .where('lendingStatus', '==', 'available');
  carList.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const { carName, lendingStatus } = change.doc.data();
        list.push({
          id: change.doc.id,
          name: carName,
          status: lendingStatus,
        });
      }
      // if (change.type === 'modified') {
      //   console.log('変わったよ');
      // }
    });
  });
  carList.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'modified') {
        console.log('変わったよ');
      }
    });
  });
  return list;
  // await firebase
  //   .firestore()
  //   .collection('cars')
  //   .where('lendingStatus', '===', 'available')
  //   .onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === 'modified') {
  //         console.log('変わったよ');
  //       }
  //     });
  //   });

  // const carList = await firebase
  //   .firestore()
  //   .collection('cars')
  //   // .where('lendingStatus', '==', 'available')
  //   .get();
  // const list = []; // 以降の処理を格納するlist配列
  // console.log(list);
  // const { docs } = carList;
  // console.log(docs);
  // for (let i = 0; i < docs.length; i += 1) {
  //   const doc = docs[i];
  //   const { carName, lendingStatus } = doc.data();
  //   list.push({
  //     id: doc.id,
  //     name: carName,
  //     status: lendingStatus,
  //   });
  // }

  // await firebase
  //   .firestore()
  //   .collection('cars')
  //   .onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === 'modified') {
  //         console.log('変わったよ');
  //         list = list.filter(() => change.doc.id !== docs.id);
  //       }
  //     });
  //   });
  // const carList2 = await firebase
  //   .firestore()
  //   .collection('cars')
  //   .where('lendingStatus', '==', 'available');
  // carList2.onSnapshot((snapshot) => {
  //   snapshot.docChanges().forEach((change) => {
  //     if (change.type === 'modified') {
  //       console.log('変更した');
  //     }
  //   });
  // });
  // return list;
};

// 予約一覧表示パーツ
export const getReservations = async () => {
  // 現在のreservationsの値を取得
  const reservInfo = await firebase
    .firestore()
    .collection('reservations');
  const reservations = [];

  reservInfo.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        // console.log(change.doc.data().name);
        const {
          usrId, usrName, depTime, retTime, selectedCar,
        } = change.doc.data();
        reservations.push({
          id: change.doc.id,
          userId: usrId,
          userName: usrName,
          departureTime: depTime,
          returnTime: retTime,
          selected: selectedCar,
        });
      }
    });
  });
  return reservations;
};

// 予約削除パーツ(引数にidを指定することでfirebaseから削除)
export const deleteReservation = async (id) => {
  console.log('ok');
  await firebase
    .firestore()
    .collection('reservations')
    .doc(id)
    .delete();
  // await firebase
  //   .firestore()
  //   .collection('cars')
  //   .doc(selectedId)
  //   .updata({
  //     lendingStatus: 'available';
  //   })
};

// 予約変更パーツ
export const modifyReservation = async (
  id, userId, userName, departureTime, returnTime, selected,
) => {
  console.log('modify ok');
  await firebase
    .firestore()
    .collection('reservations')
    .doc(id)
    .update({
      usrId: userId,
      usrName: userName,
      depTime: departureTime,
      retTime: returnTime,
      selectedCar: selected,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  return modifyReservation;
};

// 車両登録パーツ
export const postCar = async (name, status, rank) => {
  let addCar = null;
  const docRef = firebase
    .firestore()
    .collection('cars')
    .doc();
  const carName = name;
  const lendingStatus = status;
  const carRank = rank;

  // firestoreに送る会員データ
  const carData = {
    carName,
    lendingStatus,
    carRank,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  docRef.set(carData);
  addCar = {
    id: docRef.id,
    name: carName,
    status: lendingStatus,
    rank: carRank,
  };

  return addCar;
};

// 車両一覧画面の表示パーツ
export const getCars = async () => {
  const carsInfo = await firebase
    .firestore()
    .collection('cars')
    .orderBy('carRank')
    .get();
  const { docs } = carsInfo;

  const cars = [];
  for (let i = 0; i < docs.length; i += 1) {
    const doc = docs[i];
    const { carName, lendingStatus, carRank } = doc.data();
    cars.push({
      id: doc.id,
      name: carName,
      status: lendingStatus,
      rank: carRank,
    });
  }
  return cars;
};

// 車両変更パーツ
export const modifyCar = async (id, name, rank) => {
  console.log('ok');
  await firebase
    .firestore()
    .collection('cars')
    .doc(id)
    .update({
      carName: name,
      carRank: rank,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  return modifyCar;
};

// 車両削除パーツ
export const deleteCar = async (id) => {
  console.log('ok');
  await firebase
    .firestore()
    .collection('cars')
    .doc(id)
    .delete();
};

// 車両貸出パーツ(statusの変更)
export const lendingCar = async (id, status) => {
  console.log('ok');
  if (status === 'available') {
    await firebase
      .firestore()
      .collection('cars')
      .doc(id)
      .update({
        lendingStatus: 'unavailable',
      });
  } else if (status === 'unavailable') {
    await firebase
      .firestore()
      .collection('cars')
      .doc(id)
      .update({
        lendingStatus: 'available',
      });
  }
};
