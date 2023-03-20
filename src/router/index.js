import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth/authStore'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)
  const getPermissions = (routeName) => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    if (permissions != null && permissions.length > 0) {
      for (const iterator of permissions) {
        let it = iterator.split('.')
        if (it[0].toLowerCase() == routeName) {
          let view = it[1].split('_');
          if (view[0].toLowerCase() == 'view' && view[1] == routeName) {
            return true
          }
        }
      }
    }
    return false

  }
  9
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE)

  })
  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.getIsAuthenticated) {
      next({
        path: "/login",
        query: { to: to.path }
      });
    } else {
      let rte = to.name != undefined ? to.name.toLowerCase() : "home"
      let access = await getPermissions(rte)
      if (!to.meta.requiresViewPermission) {
        next();
      } else if (to.meta.requiresViewPermission) {
        if (access) {
          next();
        }
        next({
          path: "/unauthorized",
          query: { to: to.path }
        })
      } else {
        next({
          path: "/unauthorized",
          query: { to: to.path }
        })
      }
    }
  })

  return Router
})
