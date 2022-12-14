<template>
  <b-container
    class="test-members"
    role="main"
  >
    <h3 class="ml-3">予約一覧</h3>
    <b-row>
      <b-col v-if="reservations.length === 0">
        <p class="text-center">予約はありません。</p>
      </b-col>
      <!--v-forでid, name, emailを変数としてmembers配列から取得-->
      <b-col
        v-for="{
          id,
          userId,
          userName,
          departureTime,
          returnTime,
          selected
        } in reservations"
        :key="id"
        class="my-3"
        cols="6"
        md="4"
        lg="3"
      >
        <!--b-cardで表示-->
        <b-card
          class="reservations__reservation"
          :title="userName"
        >
          <b-card-text>車種：{{ selected }}</b-card-text>
          <b-card-text>出発日：{{ departureTime }}<br>返却日：{{ returnTime }}</b-card-text>

          <div class="text-right">
            <!--予約変更機能-->
            <!--idは予約idの単体を採用-->
            <modify-reservation
              :id="id"
              :userId="userId"
              :userName="userName"
              :departureTime="departureTime"
              :returnTime="returnTime"
              :selected="selected"
            >
            </modify-reservation>

            <!--削除機能-->
            <b-button
              id="cancelConfirm"
              @click="$bvModal.show(id+id)"
              variant="outline-danger"
            >
              <b-icon-trash></b-icon-trash>キャンセル
            </b-button>
            <!--idは予約idを2重にしたものを採用-->
            <b-modal :id="id+id" hide-footer>
              <template #modal-title>
                本当にキャンセルする？
              </template>
              <b-button
                class="mt-3"
                block
                @click.prevent="$emit('delete-reservation', id); $bvModal.hide(id+id)"
                variant="danger"
                >
                本当にキャンセル
              </b-button>
            </b-modal>
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
  // BIconCalendar,
  BRow,
} from 'bootstrap-vue';
import ModifyReservation from '@/components/ModifyReservationModal.vue';

export default {
  components: {
    BButton,
    BContainer,
    BCol,
    BCard,
    BCardText,
    BModal,
    BIconTrash,
    // BIconCalendar,
    BRow,
    ModifyReservation,
  },
  props: {
    reservations: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.reservations__reservation .card-body {
  padding: .75rem;
  background-color: #fafafa;
}

.reservations__reservation .card-title {
  margin-top: .25rem;
  font-size: 1rem;
  text-align: center;
  overflow: hidden;
}
</style>
