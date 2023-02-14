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
      })
    },
    async retriveUser() {
      id = JSON.parse(localStorage.getItem("user")).id
      await api.get(`users/${id}/`).then(response => {
        const user = response.data
        this.user = user
        this.setPermissions(JSON.stringify(user.permissions))
      })
    },
    async postUser(payload) {
      await api.post('users/', payload).then(response => {
        const usersList = response.data
        this.usersList = usersList
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
      })
    },
    setPermissions(permissions) {
      localStorage.setItem("permissions", permissions)
    },
  }
});
