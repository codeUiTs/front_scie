import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useProveedoresStore = defineStore('Proveedores', {
  state: () => ({
    ProveedoresList: {},
    ProveedoresVendiblesList: {},
    Proveedores: {},
  }),
  getters: {
    getProveedores: (state) => state.ProveedoresList,
    getProveedoresVendibles: (state) => state.ProveedoresVendiblesList,
  },
  actions: {
    async fetchProveedores() {
      await api.get('proveedor/').then(response => {
        const ProveedoresList = response.data
        this.ProveedoresList = ProveedoresList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async fetchProveedoresVendibles() {
      await api.get('proveedor/listVendible/').then(response => {
        const ProveedoresVendList = response.data
        this.ProveedoresVendiblesList = ProveedoresVendList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postProveedores(payload) {
      await api.post('proveedor/', payload).then(response => {
        const ProveedoresList = response.data
        this.ProveedoresList = ProveedoresList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putProveedores(id, payload) {
      await api.put(`proveedor/${id}/`, payload).then(response => {
        const ProveedoresList = response.data
        this.ProveedoresList = ProveedoresList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async patchUser(id, payload) {
      await api.patch(`proveedor/${id}/`, payload).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          }).catch((error) => {
            return Promise.reject(error)
          })
        }
      })
    },
    async deleteProveedores(id) {
      await api.delete(`proveedor/${id}/`).then(response => {
        const ProveedoresList = response.data
        this.ProveedoresList = ProveedoresList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
  }
});
