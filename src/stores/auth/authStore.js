import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: null,
    isAuthenticated: false,
  }),
  getters: {
    getUserName: (state) => state.user.name,
    getMe: (state) => state.user,
    getToken: (state) => state.token,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {

    async doLogin(payload) {
      await api.post('login/', payload).then(response => {
        const token = response.data.token
        const user = response.data.user
        const permissions = response.data.permissions
        this.setPermissions(JSON.stringify(permissions))
        this.setToken(token)
        this.getUser(user)
      })
    },

    async signOut() {
      await api.post('logout/').then(response => {
        Notify.create({
          type: "positive",
          message: response.data.session_message,
        });
        api.defaults.headers.common.Authorization = ''
        this.removeToken()
      }).catch(error => {
        api.defaults.headers.common.Authorization = ''
        this.removeToken()
        console.error(error);
      })
    },

    getUser(user) {
      this.user = user
      if (typeof user == "object") {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.setItem('user', user)
      }

    },

    async init() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token) {
        this.setToken(token)
        api.defaults.headers.common.Authorization = 'Token ' + token
        this.getUser(JSON.parse(user))
      } else {
        this.removeToken()
      }
    },

    setToken(token) {
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('token', token)
      api.defaults.headers.common.Authorization = 'Token ' + token
    },

    setPermissions(permissions) {
      localStorage.setItem("permissions", permissions)
    },

    removeToken() {
      this.token = ''
      this.isAuthenticated = false
      localStorage.clear()
    }
  },
});
