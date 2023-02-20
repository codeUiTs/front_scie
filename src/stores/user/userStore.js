import { defineStore } from 'pinia';
import { Loading, Notify, QSpinnerBars } from 'quasar';
import { api } from 'src/boot/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    usersList: {},
    user: {},
  }),
  getters: {
    getUsers: (state) => state.usersList,
  },
  actions: {
    async fetchUsers() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: "accent",
        message: "Cargando...",
      });
      await api.get('users/').then(response => {
        const usersList = response.data
        this.usersList = usersList
        Loading.hide()
      }).catch((error) => {
        Loading.hide()
        return Promise.reject(error)
      })
    },
    async retriveUser() {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: "accent",
        message: "Cargando...",
      });
      id = JSON.parse(localStorage.getItem("user")).id
      await api.get(`users/${id}/`).then(response => {
        const user = response.data
        this.user = user
        this.setPermissions(JSON.stringify(user.permissions))
        Loading.hide()
      }).catch((error) => {
        Loading.hide()
        return Promise.reject(error)
      })
    },
    async postUser(payload) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: "accent",
        message: "Cargando...",
      });
      await api.post('users/', payload).then(response => {
        const usersList = response.data
        this.usersList = usersList
        Loading.hide()
      }).catch((error) => {
        Loading.hide()
        return Promise.reject(error)
      })
    },
    async putUser(id, payload) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: "accent",
        message: "Cargando...",
      });
      await api.put(`users/${id}/`, payload).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
        Loading.hide()
      }).catch((error) => {
        Loading.hide()
        return Promise.reject(error)
      })
    },
    async patchUser(id, payload) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: "accent",
        message: "Cargando...",
      });
      await api.patch(`users/${id}/`, payload).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
        Loading.hide()
      }).catch((error) => {
        Loading.hide()
        return Promise.reject(error)
      })
    },
    async deleteUser(id) {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: "accent",
        message: "Cargando...",
      });
      await api.delete(`users/${id}/`).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
        Loading.hide()
      }).catch((error) => {
        Loading.hide()
        return Promise.reject(error)
      })
    },
    setPermissions(permissions) {
      localStorage.setItem("permissions", permissions)
    },
  }
});
