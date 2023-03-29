import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useProductosStore = defineStore('Productos', {
  state: () => ({
    ProductosList: [],
    ProductosVendiblesList: [],
    Productos: [],
    salidas: [],
  }),
  getters: {
    getProductos: (state) => state.ProductosList,
    getSalidas: (state) => state.salidas,
    getProductosVendibles: (state) => state.ProductosVendiblesList,
  },
  actions: {
    async fetchProductos() {
      await api.get('producto/').then(response => {
        const ProductosList = response.data
        this.ProductosList = ProductosList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async fetchProductosByGreater() {
      await api.get('producto/listGreaterThan/').then(response => {
        const ProductosList = response.data
        this.ProductosList = ProductosList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async fetchSalidas() {
      await api.get('salidaInventario/').then(response => {
        const SalidasList = response.data
        this.salidas = SalidasList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async fetchProductosVendibles() {
      await api.get('producto/listVendible/').then(response => {
        const ProductosVendList = response.data
        this.ProductosVendiblesList = ProductosVendList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postProductos(payload) {
      await api.post('producto/', payload).then(response => {
        const ProductosList = response.data
        this.ProductosList = ProductosList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putProductos(id, payload) {
      await api.put(`producto/${id}/`, payload).then(response => {
        const ProductosList = response.data
        this.ProductosList = ProductosList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async patchUser(id, payload) {
      await api.patch(`Producto/${id}/`, payload).then(response => {
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
    async deleteProductos(id) {
      await api.delete(`producto/${id}/`).then(response => {
        const ProductosList = response.data
        this.ProductosList = ProductosList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
  }
});
