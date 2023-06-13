<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col />
      <v-col>
        <v-card title="Login" variant="tonal">
          <v-form @submit.prevent="loginSubmit">
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
    loginSubmit() {
      const { userName, userPassword } = this.user;

      JsSIP.debug.enable("JsSIP:*");

      // const socket = new JsSIP.WebSocketInterface("wss://localhost:8080");
      var socket = new JsSIP.WebSocketInterface("ws://sip-ws.example.com");
      socket.via_transport = "tcp";

      const configuration = {
        sockets: [socket],
        uri: `sip:${userName}@example.com`,
        password: userPassword,
      };

      const ua = new JsSIP.UA(configuration);
      ua.start();

      const eventHandlers = {
        progress: function () {
          console.log("call is in progress");
        },
        failed: function (e) {
          console.log("call failed with cause: " + e.data.cause);
        },
        ended: function (e) {
          console.log("call ended with cause: " + e.data.cause);
        },
        confirmed: function () {
          console.log("call confirmed");
        },
      };

      const options = {
        eventHandlers: eventHandlers,
        mediaConstraints: { audio: true, video: true },
      };

      ua.call("sip:bob@example.com", options);
    },
  },
};
</script>
