<template>
  <div v-if="lendingStatus === 'available'">
    <b-button
      block
      variant="success"
      class="mt-3"
      @click="$emit('lending-car', id, status)"
    >
      貸出
    </b-button>
  </div>
  <div v-else>
    <b-button
      block
      variant="danger"
      class="mt-3"
      @click="$emit('lending-car', id, status)"
    >
      返却
    </b-button>
  </div>
</template>

<script>
import {
  BButton,
} from 'bootstrap-vue';

export default {
  components: {
    BButton,
  },

  props: ['id', 'status'],

  data() {
    return {
      lendingStatus: this.status,
    };
  },
};
</script>
