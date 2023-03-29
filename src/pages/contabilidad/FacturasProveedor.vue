<template>
  <q-page padding>
    <GenericTable
      v-if="getterData.length > 0"
      ref="child"
      :table-title="$t('accounting.supplierInvoices')"
      :form-config="formConfig"
      :title-export="'facturas-proveedor'"
      :getter-data="getterData"
      :api-route="'facturas-proveedor/'"
      :front-route="'/contabilidad/facturaProveedor'"
      v-on:sync:data="getData($event)"
      v-on:send:put="putRecord($event)"
      v-on:send:post="postRecord($event)"
      v-on:send:del="deleteRecord($event)"
    />
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import GenericTable from "src/components/custom/GenericTable.vue";
import { useQuasar } from "quasar";
import { usefpStore } from "src/stores/facturasProveedor/fpStore";
import { useProductosStore } from "src/stores/productos/productos";

export default defineComponent({
  name: "FacturasProveedor",
  components: {
    GenericTable,
  },
  setup() {
    const fpStore = usefpStore();
    const ProductoStore = useProductosStore();
    const quasar = useQuasar();
    return {
      fpStore,
      quasar,
      ProductoStore,
    };
  },
  data: function () {
    return {
      data: [],
      getterData: [],
      proveedores: [],
      productos: [],
      formConfig: [
        {
          element: "fecha_factura",
          type: "date",
          label: "Fecha de la factura",
          required: false,
        },
        {
          element: "descripcion",
          type: "text",
          label: "Descripción",
          required: false,
        },
        {
          element: "fecha_vencimiento",
          type: "date",
          label: "Fecha de vencimiento",
          required: false,
        },
        {
          element: "importe",
          type: "number",
          label: "Importe",
          required: false,
        },
        {
          element: "estado",
          type: "select",
          label: "Estado",
          required: false,
          options: [
            {
              value: "Paid",
              label: "Paid",
            },
            {
              value: "Draft",
              label: "Draft",
            },
            {
              value: "Cancel",
              label: "Cancel",
            },
            {
              value: "Process",
              label: "Process",
            },
            {
              value: "Invoiced",
              label: "Invoiced",
            },
          ],
        },
      ],
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        await this.fpStore.fetchfps();
        this.getterData = this.fpStore.getfps;
        this.createSelect();
      } catch (err) {
        if (err.response.data.error) {
          this.quasar.notify({
            type: "negative",
            message: err.response.data.error,
          });
        }
      }
    },
    async putRecord(ev) {
      console.log(ev);
      try {
        await this.fpStore.putfp(ev.rows.id, ev.formData);
        await this.getData();
      } catch (error) {
        console.error(error);
        if (error.response.data.error) {
          this.quasar.notify({
            type: "negative",
            message: error.response.data.error,
          });
        }
      }
    },
    async postRecord(ev) {
      try {
        await this.fpStore.postfp(ev);
        this.$refs.child.cancel();
        await this.getData();
      } catch (error) {
        if (error.response.data.errors) {
          let msg = error.response.data.errors;
          let keys = Object.keys(msg);
          for (let index = 0; index < keys.length; index++) {
            this.quasar.notify({
              type: "negative",
              position: "bottom",
              message: `${keys[index].toUpperCase()}: ${msg[keys[index]]}`,
            });
          }
        }
      }
    },
    async deleteRecord(ev) {
      try {
        await this.fpStore.deletefp(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },

    async createSelect() {
      try {
        this.proveedores = [];
        this.productos = [];
        await this.ProductoStore.fetchProductos();
        await this.fpStore.fetchproveedor();
        let proveedores = this.fpStore.getproveedor;
        let productos = this.ProductoStore.getProductos;
        proveedores.forEach(this.setproveedores);
        productos.forEach(this.setProductos);
        this.formConfig.push({
          element: "proveedor",
          type: "select",
          multiple: false,
          label: "Proveedor",
          required: true,
          options: this.proveedores,
        });
        this.formConfig.push({
          element: "producto",
          type: "select",
          multiple: false,
          label: "Productos",
          required: false,
          options: this.productos,
        });
      } catch (error) {
        if (err.response.data.error) {
          this.quasar.notify({
            type: "negative",
            message: err.response.data.error,
          });
        }
      }
    },

    setproveedores(element, index) {
      this.proveedores.push({
        value: element.id,
        label: String(element.nombre),
      });
    },

    setProductos(element, index) {
      this.productos.push({
        value: element.id,
        label: String(element.nombre),
      });
    },
  },
});
</script>
