import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const usePlanContableStore = defineStore('PlanContable', {
  state: () => ({
    PlanContableList: {},
    PlanContable: {},
    cuentas: [],
  }),
  getters: {
    getPlanContable: (state) => state.PlanContableList,
    getCuentas: (state) => state.cuentas,
  },
  actions: {
    async fetchPlanContable() {
      await api.get('planContable/').then(response => {
        const PlanContableList = response.data
        this.PlanContableList = PlanContableList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async fetchCuentas() {
      await api.get('planContable/cuentas/').then(response => {
        const cuentas = response.data
        this.cuentas = cuentas
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postPlanContable(payload) {
      await api.post('planContable/', payload).then(response => {
        const PlanContableList = response.data
        this.PlanContableList = PlanContableList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putPlanContable(id, payload) {
      await api.put(`planContable/${id}/`, payload).then(response => {
        const PlanContableList = response.data
        this.PlanContableList = PlanContableList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async patchUser(id, payload) {
      await api.patch(`planContable/${id}/`, payload).then(response => {
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
    async deletePlanContable(id) {
      await api.delete(`planContable/${id}/`).then(response => {
        const PlanContableList = response.data
        this.PlanContableList = PlanContableList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
  }
});
