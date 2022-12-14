<template>
  <b-container
    class="test-members"
    role="main"
  >
    <h3 class="ml-3">会員一覧</h3>
    <b-row>
      <b-col v-if="members.length === 0">
        <p class="text-center">登録会員はいません。</p>
      </b-col>
      <!--v-forでid, name, emailを変数としてmembers配列から取得-->
      <b-col
        v-for="{ id, name, email } in members"
        :key="id"
        class="my-3"
        cols="6"
        md="4"
        lg="3"
      >
        <!--b-cardで表示-->
        <b-card
          class="members__member"
          :title="name"
          :sub-title="email"
        >
          <new-reservation :userId="id" :userName="name"></new-reservation>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BCol,
  BCard,
  BRow,
} from 'bootstrap-vue';
import NewReservation from '@/components/NewReservationModal.vue';

export default {
  components: {
    BContainer,
    BCol,
    BCard,
    BRow,
    NewReservation,
  },
  props: {
    members: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.members__member .card-body {
  padding: .75rem;
  background-color: #fafafa;
}

.members__member .card-title {
  margin-top: .25rem;
  font-size: 1rem;
  text-align: center;
  overflow: hidden;
}
</style>
