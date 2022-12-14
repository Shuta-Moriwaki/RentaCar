<template>
  <div>
    <b-button
      class="member-registration__show-btn"
      variant="outline-success"
      v-b-modal.member-registration
    >
      新規会員登録
    </b-button>

    <b-modal
      id="member-registration"
      hide-footer
      title="新規会員登録"
    >

      <b-form @submit.prevent="onSubmit">
        <b-form-group class="mb-4">
          <label for="name">名前</label>
          <b-form-input
            id="name"
            v-model="name"
            required
            type="text"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="email">メールアドレス</label>
          <b-form-input
            id="email"
            v-model="email"
            required
            type="email"
          >
          </b-form-input>
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
  BModal,
  VBModal,
} from 'bootstrap-vue';
import { postMember } from '@/services/firebaseService';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
  },
  data() {
    return {
      name: '',
      email: '',
    };
  },
  directives: { 'b-modal': VBModal },
  methods: {
    async onSubmit() {
      // 会員データをFirebaseに送信
      let response = null;
      await postMember(this.name, this.email)
        .then((data) => {
          response = data;

          // TODO: カスタムイベントを発行する
          const { id, name, email } = response;
          this.$emit('add-member', { id, name, email });

          this.hideModal();
          this.name = '';
          this.email = '';
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    hideModal() {
      this.$bvModal.hide('member-registration');
    },
  },
};
</script>

<style scoped>
.book-registration__show-btn {
  font-size: 1.2rem;
}
</style>
