import { createStore } from "vuex";

// Create a new store instance.
export default createStore({
  state() {
    return {
      ua: null,
    };
  },
  mutations: {
    updateUa(state, payload) {
      state.ua = payload;
    },
  },
});
