<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col>
        <v-text-field
          v-model="remoteUserName"
          :rules="[rules.required]"
          label="Remote Username"
        />

        <v-card title="Call To..." variant="tonal">
          <v-container>
            <v-btn type="button" class="mt-2" @click="callFn">Call</v-btn>
            <v-btn type="button" class="mx-2 mt-2 bg-red" @click="endCallFn"
              >End Call</v-btn
            >
            <v-btn type="button" class="mt-2" @click="callAnswerFn"
              >Call Answer</v-btn
            >
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <hr />

    <v-row>
      <v-col>
        <v-card title="Send Message" variant="tonal">
          <v-container>
            <v-text-field
              v-model="message"
              :rules="[rules.required]"
              label="Message"
            />

            <v-btn type="submit" class="mt-2" @click="sendMsgFn"
              >Send Message</v-btn
            >
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { toRaw } from "vue";

export default {
  data() {
    return {
      remoteUserName: "bob",
      message: "Hello from alice",
      rules: {
        required: (value) => !!value || "Required!",
      },
      ua: null,
    };
  },
  async mounted() {
    this.ua = await this.$store.state.ua;
  },
  created() {
    this.$store.dispatch("vsip/subscribe", {
      type: "callEvt",
      listener: (v) => {
        console.log(">evt", v);
      },
    });
  },
  methods: {
    callFn() {
      console.log(">ua", this.ua);

      // Register callbacks to desired call events
      var eventHandlers = {
        progress: function (e) {
          console.log("call is in progress");
        },
        failed: function (e) {
          console.log("call failed with cause: " + e.data.cause);
        },
        ended: function (e) {
          console.log("call ended with cause: " + e.data.cause);
        },
        confirmed: function (e) {
          console.log("call confirmed");
        },
      };

      var options = {
        eventHandlers: eventHandlers,
        mediaConstraints: { audio: true, video: true },
      };

      this.ua.call(`sip:${this.remoteUserName}@example.com`, options);
    },
    /* callFn() {
      this.$store.dispatch("vsip/setMediaDevices");

      this.$store.dispatch("vsip/doCall", {
        target: `${this.remoteUserName}@example.com`,
      });
    }, */
    endCallFn() {
      this.$store.dispatch("vsip/callTerminate", { callId: 1 });
    },
    /* sendMsgFn() {
      this.$store.dispatch("vsip/sendIM", this.message);
    }, */
    sendMsgFn() {
      // Register callbacks to desired message events
      var eventHandlers = {
        succeeded: function (e) {
          console.log(">MESSAGE: Sent");
        },
        failed: function (e) {
          console.log(">MESSAGE: Failed");
        },
      };

      const options = {
        eventHandlers: eventHandlers,
      };

      this.ua.sendMessage(
        `sip:${this.remoteUserName}@example.com`,
        this.message,
        options
      );
    },
    callAnswerFn() {
      const id = this.$store.getters["vsip/getSelectedOutputDevice"];
      console.log(">id", id);
      const ol = this.$store.getters["vsip/getInputDeviceList"];
      console.log(">id", ol, ol[2]);

      // const list = this.$store.getters["vsip/getListeners"];
      // const evt = [...list.callEvt];
      // console.log(">evt", evt);

      // evt.forEach((v) => console.log(v));

      this.$store.dispatch("vsip/callAnswer", {
        callId:
          "9d605b9f9773dcb1c2a1e032226d91c30c45b299834e218c54bbb526daeca3ed",
      });
    },
  },
};
</script>
