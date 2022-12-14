<template>
  <b-container
    class="Index-rental"
    role="main"
  >
    <b-row class="justify-content-center">
      <b-col
        class="my-3"
        cols="12"
        md="8"
        lg="6"
      >
        <h1>共通ログインメニュー</h1>
        <b-form>
          <b-form-group class="mb-4">
            <label for="usermail">メールアドレス</label>
            <b-form-input
              id="usermail"
              v-model="usermail"
              required
              type="email"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group class="mb-4">
            <label for="usermail">パスワード</label>
            <b-form-input
              id="userpass"
              v-model="userpass"
              required
              type="password"
            >
            </b-form-input>
          </b-form-group>
          <b-alert
            class="mt-4"
            variant="danger"
            :show="hasError"
          >
            ログインに失敗しました。
          </b-alert>
          <b-button
            variant="success"
            type="button"
            @click="onClickLogIn"
          >
            ログイン
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BAlert,
  BButton,
  BCol,
  BContainer,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
} from 'bootstrap-vue';
import firebase from 'firebase/app';

export default {
  components: {
    BAlert,
    BButton,
    BCol,
    BContainer,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
  },
  data() {
    return {
      usermail: '',
      userpass: '',
      hasError: false,
    };
  },
  methods: {
    onClickLogIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usermail, this.userpass)
        .then(() => {
          // ログイン成功
          console.log('ログイン成功');
          this.hasError = false;
        })
        .catch((error) => {
          // ログイン失敗
          console.error('ログインエラー', error);
          this.hasError = true;
        });
    },
  },
};
</script>

<style>
</style>
