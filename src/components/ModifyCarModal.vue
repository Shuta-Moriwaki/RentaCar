<template>
  <div>
    <b-button
      class="modify-car mt-3"
      variant="outline-primary"
      v-b-modal="id"
    >
      <b-icon-pencil></b-icon-pencil>編集
    </b-button>
    <b-modal
      :id="id"
      hide-footer
      title="車両変更"
    >
      <b-form @submit.prevent="onModify">
       <b-form-group class="mb-4">
          <label for="modName">車名</label>
          <b-form-input
            id="modName"
            v-model="modName"
            required
            type="text"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <b-form-select v-model="modRank" required>
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
  BIconPencil,
  VBModal,
} from 'bootstrap-vue';
import { modifyCar } from '@/services/firebaseService';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BIconPencil,
    BModal,
  },

  directives: { 'b-modal': VBModal },

  props: ['id', 'name', 'rank'],

  data() {
    return {
      modName: this.name,
      modRank: this.rank,
    };
  },

  methods: {
    async onModify() {
      let response = null;
      await modifyCar(
        this.id,
        this.modName,
        this.modRank,
      )
        .then((data) => {
          response = data;

          // TODO: カスタムイベントを発行
          const {
            id, modName, modRank,
          } = response;
          this.$emit('modify-car', {
            id, modName, modRank,
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
