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
      await api.get("solicitud-suministro/").then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
    async postSolicitud(payload) {
      await api.post("solicitud-suministro/", payload).then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
    async putSolicitud(id, payload) {
      await api.put(`solicitud-suministro/${id}/`, payload).then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
    async deleteSolicitud(id) {
      await api.delete(`solicitud-suministro/${id}/`).then((response) => {
        const solicitudList = response.data;
        this.solicitudList = solicitudList;
      });
    },
  },
});
