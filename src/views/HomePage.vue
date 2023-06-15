<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col>
        <v-card title="Login" variant="tonal">
          <v-form @submit.prevent="callFn">
            <v-text-field
              v-model="user.callerName"
              :rules="[rules.required]"
              label="Caller ID"
            />

            <v-btn type="submit" class="mt-2">Call</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        callerName: "",
      },
      rules: {
        required: (value) => !!value || "Required!",
      },
      activeRooms: [],
    };
  },
  methods: {
    async callFn() {
      this.$store.dispatch(
        "vsip/doCall",
        { target: "bob@example.com" },
        {
          root: true,
        }
      );
    },
  },
};
</script>
