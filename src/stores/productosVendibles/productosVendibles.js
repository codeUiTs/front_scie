import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useProductosVendiblesStore = defineStore('ProductosVendibles', {
  state: () => ({
    ProductosVendiblessList: {},
    ProductosVendibles: {},
  }),
  getters: {
    getProductosVendibless: (state) => state.ProductosVendiblessList,
  },
  actions: {
    async fetchProductosVendibless() {
      await api.get('productosVendibles/').then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postProductosVendibles(payload) {
      await api.post('productosVendibles/', payload).then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putProductosVendibles(id, payload) {
      await api.put(`productosVendibles/${id}/`, payload).then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async patchUser(id, payload) {
      await api.patch(`ProductosVendibles/${id}/`, payload).then(response => {
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
    async deleteProductosVendibles(id) {
      await api.delete(`productosVendibles/${id}/`).then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
  }
});
