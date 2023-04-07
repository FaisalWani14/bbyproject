import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useUserStore = defineStore("loginuser", {
  state: () => ({
    userid: useStorage("userid", ""),
    username: useStorage("username", ""),
    userdesign: useStorage("userdesign", ""),
  }),
  getters: {
    getUserId: (state) => {
      return state.userid;
    },
    getFullname: (state) => {
      return state.fullname;
    },
  },
  actions: {
    clearStorage() {
      this.userid = "";
      this.fullname = "";
    },
  },
});
