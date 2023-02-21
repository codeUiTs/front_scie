import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const usefcStore = defineStore('fc', {
  state: () => ({
    fcsList: {},
    fc: {},
  }),
  getters: {
    getfcs: (state) => state.fcsList,
  },
  actions: {
    async fetchfcs() {
      await api.get('facturas-cliente/').then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
    async postfc(payload) {
      await api.post('facturas-cliente/', payload).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
    async putfc(id, payload) {
      await api.put(`facturas-cliente/${id}/`, payload).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
    async deletefc(id) {
      await api.delete(`facturas-cliente/${id}/`).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
  }
});
