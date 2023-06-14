import { createStore } from "vuex";

// Create a new store instance.
export default createStore({
  state() {
    return {
      socket: null,
      options: null,
    };
  },
  mutations: {
    updateSocket(state, payload) {
      state.socket = payload.socket;
    },
    init(state, payload) {
      state.options = payload;
    },
  },
  actions: {
    init: function (context, options) {
      context.commit(options);
    },
  },
});
