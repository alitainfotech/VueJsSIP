import { createApp } from "vue";
import VueJsSIP from "@voicenter-team/vsip";

import store from "./store";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(store)
  .use(VueJsSIP, { store })
  .use(router)
  .use(vuetify)
  .mount("#app");
