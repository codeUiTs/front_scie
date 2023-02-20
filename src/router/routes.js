const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/IndexPage.vue") },
      { path: "/perfil", component: () => import("pages/Config/Perfil.vue") },
      {
        path: "/contabilidad",
        redirect: "facturas-cliente",
        children: [
          {
            name: "facturas-cliente",
            path: "facturas-cliente",
            component: () => import("pages/contabilidad/FacturasCliente.vue"),
          },
          {
            name: "pagos",
            path: "pagos",
            component: () => import("src/pages/contabilidad/Pagos.vue"),
          },
          {
            name: "libroDiario",
            path: 'libroDiario',
            component: () => import('pages/contabilidad/LibroDiario.vue')
          },
          {
            name: "ProductosVendibles",
            path: "ProductosVendibles",
            component: () => import("src/pages/contabilidad/ProductosVendibles.vue"),
          }
        ]
      },
      {
        path: "/inventario",
        redirect: "inventario",
        children: [
          {
            name: "inventario",
            path: "inventario",
            component: () => import("pages/inventario/Transferencias.vue"),
          },
          {
            name: "solicitud-suministros",
            path: "solicitud-suministros",
            component: () => import("pages/inventario/SolicitudSuministros.vue"),
          },
        ]
      },
      {
        path: "/config",
        redirect: "users",
        children: [
          {
            name: "users",
            path: "users",
            component: () => import("pages/config/Usuarios.vue"),
            meta: {
              requiresViewPermission: true
            }
          },
        ]
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/unauthorized",
    component: () => import("pages/ErrorNotPermission.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
