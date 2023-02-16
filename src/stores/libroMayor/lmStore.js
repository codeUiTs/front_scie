import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const uselmStore = defineStore('lm', {
  state: () => ({
    lmsList: {},
    lm: {},
  }),
  getters: {
    getLms: (state) => state.lmsList,
  },
  actions: {
    async fetchLms() {
      await api.get('lms/').then(response => {
        const lmsList = response.data
        this.lmsList = lmsList
      })
    },
    async postLm(payload) {
      await api.post('lms/', payload).then(response => {
        const lmsList = response.data
        this.lmsList = lmsList
      })
    },
    async putLm(id, payload) {
      await api.put(`lms/${id}/`, payload).then(response => {
        const lmsList = response.data
        this.lmsList = lmsList
      })
    },
    async deleteLm(id) {
      await api.delete(`lms/${id}/`).then(response => {
        const lmsList = response.data
        this.lmsList = lmsList
      })
    },
  }
});
