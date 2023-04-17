import { defineStore } from "pinia";
import { useStorage  } from "@vueuse/core";

export const useDesignStore = defineStore("designstore", {
  state: () => ({
    counter: useStorage("counterState", 0),
    design: useStorage("designState", {}),
    html: useStorage('htmlState', [])
  }),
  getters: {
    getDesignId: (state) => {
      return state.design;
    },
    
    
  },
  actions: {
    clearStorage() {
      this.design = "";
    }, 
    increment () {
      this.counter++
    },
  },
});
