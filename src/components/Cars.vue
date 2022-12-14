<template>
  <b-container
    class="cars"
    role="main"
  >
    <h3 class="ml-3">車両一覧</h3>
    <b-row>
      <b-col v-if="cars.length === 0">
        <p class="text-center">登録車両はありません。</p>
      </b-col>
      <b-col
        v-for="{
          id,
          name,
          status,
          rank,
        } in cars"
        :key="id"
        class="my-3"
        cols="6"
        md="4"
        lg="3"
      >
        <b-card
          class="cars__car"
          :title="name"
          :sub-title="rank"
        >
          <div v-if="status === 'available'">
            <b-card-text class="text-left">状態：在庫有り</b-card-text>
          </div>
          <div v-else>
            <b-card-text class="text-left">状態：貸出中</b-card-text>
          </div>
          <div class="text-right">
            <!--貸出機能-->
            <lending :id="id" :status="status" @lending-car="onLendingCar"></lending>
            <!--managerの場合表示-->
            <div v-if="currentEmail === 'manager@example.com'">
              <!--オプション機能-->
              <div class="d-flex justify-content-end">
                <!--車両変更-->
                <modify-car
                  :id="id"
                  :name="name"
                  :rank="rank"
                >
                </modify-car>

                <!--削除機能-->
                <b-button
                  id="deleteCar"
                  @click="$bvModal.show(id+id)"
                  variant="outline-danger"
                  class="mt-3 ml-3"
                >
                  <b-icon-trash></b-icon-trash>削除
                </b-button>
                <b-modal :id="id+id" hide-footer>
                  <template #modal-title>
                    本当に削除しますか？
                  </template>
                  <b-button
                    class="mt-3"
                    block
                    @click="$emit('delete-car', id); $bvModal.hide(id+id)"
                    variant="danger"
                  >
                    本当に削除
                  </b-button>
                </b-modal>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BButton,
  BContainer,
  BCol,
  BCard,
  BCardText,
  BModal,
  BIconTrash,
  BRow,
} from 'bootstrap-vue';
import ModifyCar from '@/components/ModifyCarModal.vue';
import Lending from '@/components/Lending.vue';
import { lendingCar } from '@/services/firebaseService';

export default {
  components: {
    BButton,
    BContainer,
    BCol,
    BCard,
    BCardText,
    BModal,
    BIconTrash,
    BRow,
    ModifyCar,
    Lending,
  },
  props: {
    cars: {
      type: Array,
      required: true,
    },
    currentEmail: {
      type: String,
    },
  },

  methods: {
    makeToast(title, msg) {
      this.$bvToast.toast(msg, {
        autoHideDelay: 5000,
        title,
        variant: 'danger',
      });
    },
    async onLendingCar(id, status) {
      await lendingCar(id, status).catch((err) => {
        console.error(err.message);
        this.makeToast('エラーの発生', '貸出状況を更新できませんでした。');
      });
    },
  },
};
</script>
<style scoped>
.cars__car .card-body {
  padding: .75rem;
  background-color: #fafafa;
}

.cars__car .card-title {
  margin-top: .25rem;
  font-size: 1rem;
  text-align: center;
  overflow: hidden;
}
</style>
