<template>
  <div v-if="currentEmail == salesEmail">
    <div id="app">
      <title-header><h1>予約メニュー</h1></title-header>
      <sales-contents></sales-contents>
    </div>
  </div>
  <div v-else-if="currentEmail == generalEmail">
    <div id="app">
      <title-header><h1>管理メニュー(一般)</h1></title-header>
      <general-contents></general-contents>
    </div>
  </div>
  <div v-else-if="currentEmail == managerEmail">
    <div id="app">
      <title-header><h1>管理メニュー(マネージャー)</h1></title-header>
      <manager-contents :currentEmail="managerEmail"></manager-contents>
    </div>
  </div>
  <div v-else>
    <div id ="app">
      <login></login>
    </div>
  </div>
</template>

<script>
import TitleHeader from '@/components/TitleHeader.vue';
import SalesContents from '@/components/SalesContents.vue';
import GeneralContents from '@/components/GeneralContents.vue';
import ManagerContents from '@/components/ManagerContents.vue';
import Login from '@/components/Login.vue';
import firebase from 'firebase/app';

export default {
  components: {
    TitleHeader, SalesContents, GeneralContents, ManagerContents, Login,
  },

  data() {
    return {
      currentEmail: null,
      salesEmail: 'sales@example.com',
      generalEmail: 'general@example.com',
      managerEmail: 'manager@example.com',
    };
  },

  async created() {
    // ログイン状態を監視
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('状態：ログイン中');
        this.currentEmail = user.email;
        console.log(this.currentEmail);
      } else {
        console.log('状態：ログアウト');
        this.currentEmail = null;
      }
    });
  },
};
</script>
