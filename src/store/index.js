import { createStore } from "vuex";

// Create a new store instance.
export default createStore({
  actions: {
    init: function (context, options) {
      context.commit(options);
    },
  },
});
