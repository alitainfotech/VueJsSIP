<template>
  <v-btn variant="tonal" @click="callFn">Call</v-btn>
  {{}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeRooms: [],
      // getters:
    };
  },
  created() {
    console.log("getters", this.$store.getters);
  },
  computed: {
    viewGettersFn() {
      console.log(">", { ...mapGetters(["vsip/getActiveRooms"]) });
    },
  },
  methods: {
    callGettrsFn() {
      this.viewGettersFn();
    },
    async callFn() {
      const actRooms = {
        ...(await this.$store.getters.getActiveRooms),
      };
      console.log("actRooms", actRooms);
      // this.activeRooms.push(this.$store.getters.getActiveRooms);
    },
  },
};
</script>
