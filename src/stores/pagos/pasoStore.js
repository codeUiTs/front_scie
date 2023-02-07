import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const usepagoStore = defineStore('pago', {
  state: () => ({
    pagosList: {},
    pago: {},
  }),
  getters: {
    getpagos: (state) => state.pagosList,
  },
  actions: {
    async fetchpagos() {
      await api.get('pagos/').then(response => {
        const pagosList = response.data
        this.pagosList = pagosList
      })
    },
    async postpago(payload) {
      await api.post('pagos/', payload).then(response => {
        const pagosList = response.data
        this.pagosList = pagosList
      })
    },
    async putpago(id, payload) {
      await api.put(`pagos/${id}/`, payload).then(response => {
        const pagosList = response.data
        this.pagosList = pagosList
      })
    },
    async deletepago(id) {
      await api.delete(`pagos/${id}/`).then(response => {
        const pagosList = response.data
        this.pagosList = pagosList
      })
    },
  }
});
