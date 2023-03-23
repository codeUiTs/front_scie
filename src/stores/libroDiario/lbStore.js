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
      await api.get('libroDiario/').then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postLb(payload) {
      await api.post('libroDiario/', payload).then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putLb(id, payload) {
      await api.put(`libroDiario/${id}/`, payload).then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async deleteLb(id) {
      await api.delete(`libroDiario/${id}/`).then(response => {
        const lbsList = response.data
        this.lbsList = lbsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
  }
});
