import { defineStore } from 'pinia';
import { Notify } from 'quasar';
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
      await api.get('users/').then(response => {
        const usersList = response.data
        this.usersList = usersList
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async retriveUser() {
      id = JSON.parse(localStorage.getItem("user")).id
      await api.get(`users/${id}/`).then(response => {
        const user = response.data
        this.user = user
        this.setPermissions(JSON.stringify(user.permissions))
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async postUser(payload) {
      await api.post('users/', payload).then(response => {
        if (response.status == 201) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async putUser(id, payload) {
      await api.put(`users/${id}/`, payload).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async patchUser(id, payload) {
      await api.patch(`users/${id}/`, payload).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async deleteUser(id) {
      await api.delete(`users/${id}/`).then(response => {
        if (response.status == 200) {
          Notify.create({
            type: "positive",
            message: response.data.message,
            position: "bottom"
          })
        }
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    async setPassword(id, payload) {
      await api.post(`set-password/${id}/`, payload).then(response => {
        Notify.create({
          type: "positive",
          message: response.data.message,
          position: "bottom"
        })
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    setPermissions(permissions) {
      localStorage.setItem("permissions", permissions)
    },
  }
});
