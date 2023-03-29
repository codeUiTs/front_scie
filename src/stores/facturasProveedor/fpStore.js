import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const usefpStore = defineStore('fp', {
  state: () => ({
    fpsList: {},
    proveedorList: [],
    fp: {},
  }),
  getters: {
    getfps: (state) => state.fpsList,
    getproveedor: (state) => state.proveedorList,
  },
  actions: {
    async fetchfps() {
      await api.get('facturas-proveedor/').then(response => {
        const fpsList = response.data
        this.fpsList = fpsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async fetchproveedor() {
      await api.get('facturas-proveedor/Proveedors').then(response => {
        const cliList = response.data
        this.proveedorList = cliList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postfp(payload) {
      await api.post('facturas-proveedor/', payload).then(response => {
        const fpsList = response.data
        this.fpsList = fpsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putfp(id, payload) {
      await api.put(`facturas-proveedor/${id}/`, payload).then(response => {
        const fpsList = response.data
        this.fpsList = fpsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async deletefp(id) {
      await api.delete(`facturas-proveedor/${id}/`).then(response => {
        const fpsList = response.data
        this.fpsList = fpsList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
  }
});
