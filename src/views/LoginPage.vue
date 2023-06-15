<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col />
      <v-col>
        <v-card title="Login" variant="tonal">
          <v-form @submit.prevent="loginFn">
            <v-text-field
              v-model="user.userName"
              :rules="[rules.required]"
              label="Username"
            />

            <v-text-field
              v-model="user.userPassword"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              @click:append="showPassword = !showPassword"
            />

            <v-btn type="submit" class="mt-2">Login</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col />
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  data: () => ({
    showPassword: false,
    user: {
      userName: "",
      userPassword: "",
    },
    rules: {
      required: (value) => !!value || "Required!",
    },
  }),
  methods: {
    loginFn() {
      const { userName, userPassword } = this.user;

      // JsSIP.debug.enable("JsSIP:*");

      const options = {
        configuration: {
          session_timers: true,
          uri: `sip:${userName}@example.com`,
          password: userPassword,
        },
        socketInterfaces: ["ws://localhost:8080"],
        sipDomain: `sip:${userName}@example.com`,
      };

      this.$store.dispatch("vsip/init", options);

      router.push({ path: "/home" });
    },
  },
};
</script>
