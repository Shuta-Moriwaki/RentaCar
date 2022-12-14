<template>
  <b-container>
    <b-row>
      <b-col>
        <cars :cars="cars"></cars>
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
import Cars from '@/components/Cars.vue';
import firebase from 'firebase/app';
import { getCars } from '@/services/firebaseService';

export default {
  components: {
    BCol,
    BContainer,
    BRow,
    Cars,
  },

  data() {
    return {
      cars: [],
    };
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
  },
};
</script>
