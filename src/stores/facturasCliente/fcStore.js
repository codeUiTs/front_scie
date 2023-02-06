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
      await api.get('fcs/').then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
    async postfc(payload) {
      await api.post('fcs/', payload).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
    async putfc(id, payload) {
      await api.put(`fcs/${id}/`, payload).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
    async deletefc(id) {
      await api.delete(`fcs/${id}/`).then(response => {
        const fcsList = response.data
        this.fcsList = fcsList
      })
    },
  }
});
