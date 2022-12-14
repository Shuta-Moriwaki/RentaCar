<template>
  <b-container>
    <b-row>
      <b-col>
        <b-navbar>
          <!--<b-navbar-brand href="./index.html">-->
          <slot></slot>
          <!--</b-navbar-brand>-->
          <b-button
            class="ml-3"
            variant="primary"
            type="button"
            @click="onClickLogOut"
          >
            ログアウト
          </b-button>
        </b-navbar>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BButton,
  BCol,
  BContainer,
  BNavbar,
  // BNavbarBrand,
  BRow,
} from 'bootstrap-vue';
import firebase from 'firebase/app';

export default {
  components: {
    BButton,
    BCol,
    BContainer,
    BNavbar,
    // BNavbarBrand,
    BRow,
  },
  methods: {
    onClickLogOut() {
      firebase
        .auth()
        .signOut() // ログアウト実行
        .then(() => {
          // ログアウト成功
          console.log('ログアウトしました');
        })
        .catch((error) => {
          // ログアウト失敗
          console.log('ログアウトエラー', error);
        });
    },
  },
};
</script>
