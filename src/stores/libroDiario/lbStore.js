import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const uselbStore = defineStore('lb', {
  state: () => ({
    lbsList: {},
    lb: {},
  }),
  getters: {
    getLbs: (state) => state.lbsList,
  },
  actions: {
    async fetchLbs() {
      await api.get('lbs/').then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      })
    },
    async postLb(payload) {
      await api.post('lbs/', payload).then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      })
    },
    async putLb(id, payload) {
      await api.put(`lbs/${id}/`, payload).then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      })
    },
    async deleteLb(id) {
      await api.delete(`lbs/${id}/`).then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      })
    },
  }
});
