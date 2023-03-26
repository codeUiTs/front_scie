<template>
  <q-page>
    <GenericTable
      ref="child"
      :table-title="$t('inventory.requestForSupplies')"
      :form-config="formConfig"
      :title-export="'solicitudSuministros'"
      :getter-data="getterData"
      :api-route="'solicitud-suministros/'"
      :front-route="'/inventario/solicitudSuministro'"
      v-on:sync:data="getData($event)"
      v-on:send:put="putRecord($event)"
      v-on:send:post="postRecord($event)"
      v-on:send:del="deleteRecord($event)"
      v-on:enable:create="create = $event"
    />
    <SolicitudSuministrosTable v-show="create" :rows="rows"> </SolicitudSuministrosTable>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import GenericTable from "src/components/custom/GenericTable.vue";
import SolicitudSuministrosTable from "src/components/custom/SolicitudSuministrosTable.vue";
import { useSolicitudStore } from "src/stores/solicitudSuministros/solicitudStore";
import { useProductosStore } from "src/stores/productos/productos";

export default defineComponent({
  name: "SolicitudPage",
  components: {
    GenericTable,
    SolicitudSuministrosTable,
  },
  setup() {
    const solicitudStore = useSolicitudStore();
    const ProductoStore = useProductosStore();
    const quasar = useQuasar();
    return {
      solicitudStore,
      ProductoStore,
      quasar,
    };
  },
  data: function () {
    return {
      create: false,
      data: [],
      rows: [],
      getterData: [],
      productos: [],
      formConfig: [
        // {
        //   element: "producto_solicitado",
        //   type: "text",
        //   required: true,
        //   label: "Producto solicitado",
        // },
        // {
        //   element: "producto_entregado",
        //   type: "text",
        //   required: true,
        //   label: "Producto solicitado",
        // },
        {
          element: "estado",
          type: "select",
          required: false,
          label: "Estado",
          multiple: false,
          options: [
            { value: "pendiente", label: "Pendiente" },
            { value: "entregado", label: "Entregado" },
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
        await this.solicitudStore.fetchSolicitud();
        this.getterData = this.solicitudStore.getSolicitud;
        this.rows = this.solicitudStore.getSolicitud;
        this.createSelect();
      } catch (err) {
        if (err.response.data.error) {
          this.quasar.notify({
            type: "negative",
            message: err.response.data.error,
          });
        }
        throw err;
      }
    },
    async putRecord(ev) {
      console.log(ev);
      try {
        await this.solicitudStore.putSolicitud(ev.rows.id, ev.formData);
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
        await this.solicitudStore.postSolicitud(ev);
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
        await this.solicitudStore.deleteSolicitud(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },

    async createSelect() {
      try {
        this.productos = [];
        await this.ProductoStore.fetchProductos();
        let productos = this.ProductoStore.getProductos;
        productos.forEach(this.setproductos);
        this.formConfig.push({
          element: "producto_solicitado",
          type: "select",
          multiple: false,
          label: "Producto Solicitado",
          required: true,
          options: this.productos,
        });
        this.formConfig.push({
          element: "producto_entregado",
          type: "select",
          multiple: false,
          label: "Producto Entregado",
          required: true,
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

    setproductos(element, index) {
      this.productos.push({
        value: element.id,
        label: String(element.nombre),
      });
    },
  },
});
</script>
