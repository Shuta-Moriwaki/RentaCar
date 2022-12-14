<template>
  <div>
    <b-button
      class="modify-reservation"
      variant="outline-primary"
      v-b-modal="id"
    >
      予約変更
    </b-button>

    <b-modal
      :id="id"
      hide-footer
      title="予約変更"
    >
      <b-form @submit.prevent="onModify"> <!--後で変更-->
       <b-form-group class="mb-4">
          <label for="userName"><p>名前：{{ userName }}</p></label><br>
          <label for="userId"><p>ユーザーID：{{ userId }}</p></label>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="departure">出発日時</label>
          <b-form-input
            id="departureTime"
            v-model="modDepartureTime"
            required
            type="date"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="returnTime">返却日時</label>
          <b-form-input
            id="returnTime"
            v-model="modReturnTime"
            required
            type="date"
          >
          </b-form-input>
        </b-form-group>
        <!--車種選択-->
        <b-form-group class="mb-4">
          <b-form-select v-model="modSelected" required>
            <option>ハリアー</option>
            <option>クラウン</option>
            <option>カムリ</option>
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
import { modifyReservation } from '@/services/firebaseService';

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

  props: ['id', 'userId', 'userName', 'departureTime', 'returnTime', 'selected'],

  data() {
    return {
      modUserId: this.userId,
      modUserName: this.userName,
      modDepartureTime: this.departureTime,
      modReturnTime: this.returnTime,
      modSelected: this.selected,
    };
  },

  methods: {
    async onModify() {
      // 予約データをFirestoreに送信
      let response = null;
      await modifyReservation(
        this.id,
        this.modUserId,
        this.modUserName,
        this.modDepartureTime,
        this.modReturnTime,
        this.modSelected,
      )
        .then((data) => {
          response = data;

          // TODO: カスタムイベントを発行
          const {
            id, modUserId, modUserName, modDepartureTime, modReturnTime, modSelected,
          } = response;
          this.$emit('modify-reservation', {
            id, modUserId, modUserName, modDepartureTime, modReturnTime, modSelected,
          });

          this.hideModal();
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    hideModal() {
      this.$bvModal.hide(this.id);
    },
  },
};
</script>

<style scoped>
.modify-reservation {
  font-size: 1.2rem;
}
</style>
