<template>
  <b-container>
    <b-row>
      <b-col>
        <new-member></new-member><br>
        <!--<new-reservation></new-reservation><br>-->
        <!--会員一覧を表示 members.vueのprops:members[]にonGetMembersのmembersを追加-->
        <members :members="members"></members>
        <reservations
          :reservations="reservations"
          @delete-reservation="onDeleteReservation"
        >
        </reservations>
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
import NewMember from '@/components/NewMemberModal.vue';
import Members from '@/components/Members.vue';
import Reservations from '@/components/Reservations.vue';
import {
  getMembers, getReservations, deleteReservation, modifyReservation,
} from '@/services/firebaseService';

export default {
  components: {
    BCol,
    BContainer,
    BRow,
    NewMember,
    Members,
    Reservations,
  },

  data() {
    return {
      members: [],
      reservations: [],
    };
  },
  async created() {
  // ログイン状態を監視
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.onGetMembers();
        this.onGetReservations();
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
    async onGetMembers() {
      this.members = await getMembers().catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '会員データを取得できませんでした。');
      });
    },
    async onGetReservations() {
      this.reservations = await getReservations().catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '会員データを取得できませんでした。');
      });
    },
    async onDeleteReservation(id) {
      await deleteReservation(id).catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '予約をキャンセルできませんでした。');
      });

      this.reservations = this.reservations.filter((reservation) => reservation.id !== id);
    },
    async onModifyReservation(id) {
      await modifyReservation(id).catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '予約を変更できませんでした。');
      });
    },
  },
};
</script>
