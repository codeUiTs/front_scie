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
        redirect: "facturasCliente",
        children: [
          {
            name: "facturaCliente",
            path: "facturaCliente",
            component: () => import("pages/contabilidad/FacturasCliente.vue"),
          },
          {
            name: "facturaProveedor",
            path: "facturaProveedor",
            component: () => import("pages/contabilidad/FacturasProveedor.vue"),
          },
          {
            name: "proveedor",
            path: "proveedor",
            component: () => import("pages/contabilidad/Proveedores.vue"),
          },
          {
            name: "pago",
            path: "pago",
            component: () => import("src/pages/contabilidad/Pagos.vue"),
          },
          {
            name: "libroDiario",
            path: 'libroDiario',
            component: () => import('pages/contabilidad/LibroDiario.vue')
          },
          {
            name: "libroMayor",
            path: 'libroMayor',
            component: () => import('pages/contabilidad/LibroMayor.vue')
          },
          {
            name: "productoVendible",
            path: "productoVendible",
            component: () => import("src/pages/contabilidad/ProductosVendibles.vue"),
            meta: {
              requiresViewPermission: false
            }
          },
          {
            name: "reporteFinanciero",
            path: "reporteFinanciero",
            component: () => import("pages/contabilidad/ReporteFinanciero.vue"),
          },
          {
            name: "planContable",
            path: "planContable",
            component: () => import("pages/contabilidad/PlanContable.vue"),
          },
          {
            name: "diarioVentasCompras",
            path: "diarioVentasCompras",
            component: () => import("pages/contabilidad/DiarioVentasCompras.vue"),
          },
        ],
        meta: {
          requiresViewPermission: true
        }
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
            name: "solicitudSuministro",
            path: "solicitudSuministro",
            component: () => import("pages/inventario/SolicitudSuministros.vue"),
          },
          {
            name: "producto",
            path: "producto",
            component: () => import("pages/inventario/Productos.vue"),
          },
          {
            name: "salidaInventario",
            path: "salidaInventario",
            component: () => import("pages/inventario/SalidaInventario.vue"),
          },
        ]
      },
      {
        path: "/config",
        redirect: "user",
        children: [
          {
            name: "user",
            path: "user",
            component: () => import("pages/config/Usuarios.vue"),
            meta: {
              requiresViewPermission: true
            }
          },
          {
            name: "importar",
            path: "importar",
            component: () => import("pages/Config/DragAndDrop.vue")
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
