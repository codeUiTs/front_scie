import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const usefcStore = defineStore('fc', {
  state: () => ({
    fcsList: {},
    clientesList: [],
    fc: {},
  }),
  getters: {
    getfcs: (state) => state.fcsList,
    getClientes: (state) => state.clientesList,
  },
  actions: {
    async fetchfcs() {
      await api.get('facturas-cliente/').then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async fetchClientes() {
      await api.get('facturas-cliente/clientes').then(response => {
        const cliList = response.data
        this.clientesList = cliList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postfc(payload) {
      await api.post('facturas-cliente/', payload).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putfc(id, payload) {
      await api.put(`facturas-cliente/${id}/`, payload).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async deletefc(id) {
      await api.delete(`facturas-cliente/${id}/`).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
  }
});
