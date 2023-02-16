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
      await api.get('ProductosVendibless/').then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      })
    },
    async postProductosVendibles(payload) {
      await api.post('ProductosVendibless/', payload).then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      })
    },
    async putProductosVendibles(id, payload) {
      await api.put(`ProductosVendibless/${id}/`, payload).then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      })
    },
    async patchUser(id, payload) {
      await api.patch(`ProductosVendibles/${id}/`, payload).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
      })
    },
    async deleteProductosVendibles(id) {
      await api.delete(`ProductosVendibless/${id}/`).then(response => {
        const ProductosVendiblessList = response.data
        this.ProductosVendiblessList = ProductosVendiblessList
      })
    },
  }
});
