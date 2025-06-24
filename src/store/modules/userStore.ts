import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserStore => ({
    userInfo: undefined,
  }),
  actions: {
    setUserInfo(data: UserInfo) {
      this.userInfo = data;
    },
  },
  getters: {
    getUserInfo: state => state.userInfo,
  },
});
