import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSolicitudStore = defineStore("solicitud", {
  state: () => ({
    solicitudList: {},
    solicitud: {},
  }),
  getters: {
    getSolicitud: (state) => state.solicitudList,
  },
  actions: {
    async fetchSolicitud() {
      await api.get("solicitudSuministros/").then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
    async postSolicitud(payload) {
      await api.post("solicitudSuministros/", payload).then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
    async putSolicitud(id, payload) {
      await api.put(`solicitudSuministros/${id}/`, payload).then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
    async deleteSolicitud(id) {
      await api.delete(`solicitudSuministros/${id}/`).then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
  },
});
