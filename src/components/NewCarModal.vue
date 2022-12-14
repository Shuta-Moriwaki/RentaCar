<template>
  <div>
    <b-button
      class="car-registration__show-btn"
      variant="outline-success"
      v-b-modal.car-registration
    >
      新規車両登録
    </b-button>
    <b-modal
      id="car-registration"
      hide-footer
      title="新規車両登録"
    >
      <b-form @submit.prevent="onRegisterCar">
        <b-form-group class="mb-4">
          <label for="name">車名</label>
          <b-form-input
            id="name"
            v-model="name"
            required
            type="text"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <b-form-select v-model="rank" required>
            <option disable value="">ランクを選択してください</option>
            <option>Sランク</option>
            <option>Aランク</option>
            <option>Bランク</option>
            <option>Cランク</option>
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
import { postCar } from '@/services/firebaseService';

export default {
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BModal,
  },
  data() {
    return {
      name: '',
      status: 'available',
      rank: '',
    };
  },
  methods: {
    // 車両登録メソッド
    async onRegisterCar() {
      let response = null;
      await postCar(this.name, this.status, this.rank)
        .then((data) => {
          response = data;

          // TODO: カスタムイベントを発行
          const {
            id,
            name,
            status,
            rank,
          } = response;
          this.$emit('register-car', {
            id,
            name,
            status,
            rank,
          });
          this.hideModal();
          this.name = '';
          this.rank = '';
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    hideModal() {
      this.$bvModal.hide('car-registration');
    },
  },
  directives: { 'b-modal': VBModal },
};
</script>
