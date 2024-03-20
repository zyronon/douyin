import {defineStore} from "pinia";

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      routeData: null
    }
  },
  getters: {},
  actions: {},
})