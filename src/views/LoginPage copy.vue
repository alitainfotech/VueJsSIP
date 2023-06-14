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

            <v-btn type="submit" block class="mt-2">Login</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col />
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";
import JsSIP from "jssip";

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

      const socket = this.$store.state.socket;

      const configuration = {
        sockets: [socket],
        uri: `sip:${userName}@example.com`,
        password: userPassword,
      };

      const ua = new JsSIP.UA(configuration);
      ua.start();

      ua.on("connected", function (e) {
        console.log(">Connected...", e);
      });

      ua.on("disconnected", function () {
        console.log(">DisConnected...");
      });

      router.replace({ path: "/home" });
    },
  },
};
</script>
