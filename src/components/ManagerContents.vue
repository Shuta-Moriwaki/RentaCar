<template>
  <b-container>
    <b-row>
      <b-col>
        <new-car></new-car><br>
        <cars :cars="cars" :currentEmail="currentEmail" @delete-car="onDeleteCar"></cars>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BCol,
  BContainer,
  BRow,
} from 'bootstrap-vue';
import firebase from 'firebase/app';
import NewCar from '@/components/NewCarModal.vue';
import { getCars, deleteCar, modifyCar } from '@/services/firebaseService';
import Cars from '@/components/Cars.vue';

export default {
  components: {
    BCol,
    BContainer,
    BRow,
    NewCar,
    Cars,
  },
  data() {
    return {
      cars: [],
    };
  },
  props: {
    currentEmail: {
      type: String,
    },
  },

  async created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.onGetCars();
      }
    });
  },

  methods: {
    makeToast(title, msg) {
      this.$bvToast.toast(msg, {
        autoHideDelay: 5000,
        title,
        variant: 'danger',
      });
    },
    async onGetCars() {
      this.cars = await getCars().catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '車両データを取得できませんでした。');
      });
    },
    async onDeleteCar(id) {
      await deleteCar(id).catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '車両を削除できませんでした。');
      });
      this.cars = this.cars.filter((car) => car.id !== id);
    },
    async onModifyCar(id) {
      await modifyCar(id).catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '車両を変更できませんでした。');
      });
    },
  },
};
</script>
