<template>
  <div>
    <b-button
      class="member-registration__show-btn"
      variant="outline-success"
      v-b-modal="userId"
    >
      新規予約登録
    </b-button>

    <b-modal
      :id="userId"
      hide-footer
      title="新規予約登録"
    >
      <b-form @submit.prevent="onSubmit">
        <b-form-group class="mb-4">
          <label for="userName"><p>名前：{{ userName }}</p></label><br>
          <label for="userId"><p>ユーザーID：{{ userId }}</p></label>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="departure">出発日時</label>
          <b-form-input
            id="departureTime"
            v-model="departureTime"
            required
            type="date"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="returnTime">返却日時</label>
          <b-form-input
            id="returnTime"
            v-model="returnTime"
            required
            type="date"
          >
          </b-form-input>
        </b-form-group>
        <!--車種選択-->
        <b-form-group class="mb-4">
          <b-form-select v-model="selected" required>
            <option disable value="">車種を選択してください</option>
            <option
              :list="list"
              v-for="car in list"
              :key="car.id"
              :value="car"
              :status="car.status"
              :id="car.id"
            >
              {{ car.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-button
          block
          class="mt-3"
          type="submit"
          variant="outline-success"
        >
          登録する
        </b-button>
        <!--確認画面実装予定-->
        <b-button
          block
          class="mt-3"
          type="reset"
          variant="danger"
        >
          リセットする
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BModal,
  VBModal,
} from 'bootstrap-vue';
import firebase from 'firebase/app';
import { postReserve, getList } from '@/services/firebaseService';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BModal,
  },

  directives: { 'b-modal': VBModal },

  props: ['userId', 'userName'],

  data() {
    return {
      registration: '',
      departureTime: '',
      returnTime: '',
      selected: '',
      list: [],
    };
  },

  async created() {
  // ログイン状態を監視
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.onGetList();
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
    async onSubmit() {
      // 予約データをFirestoreに送信
      let response = null;
      await postReserve(
        this.userId,
        this.userName,
        this.departureTime,
        this.returnTime,
        this.selected.name,
        this.selected.id,
      )
        .then((data) => {
          response = data;

          // TODO: カスタムイベントを発行
          const {
            userId,
            userName,
            departureTime,
            returnTime,
            selected,
            selectedId,
          } = response;
          this.$emit('add-reservation', {
            userId,
            userName,
            departureTime,
            returnTime,
            selected,
            selectedId,
          });

          this.hideModal();
          this.departureTime = '';
          this.returnTime = '';
          this.selected = '';
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    hideModal() {
      this.$bvModal.hide(this.userId);
    },
    async onGetList() {
      this.list = await getList().catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '車両リストを取得できませんでした。');
      });
    },
  },
};
</script>

<style scoped>
.book-registration__show-btn {
  font-size: 1.2rem;
}
</style>
