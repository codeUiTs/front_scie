<template>
  <q-page class="q-pa-md">
    <GenericTable
      ref="child"
      :table-title="$t('inventory.inventoryOutputs')"
      :form-config="formConfig"
      :title-export="$t('inventory.inventoryOutputs')"
      :getter-data="getterData"
      :api-route="'salidaInventario/'"
      :front-route="'/inventario/salidaInventario'"
      v-on:sync:data="getData($event)"
      v-on:send:put="putRecord($event)"
      v-on:send:post="postRecord($event)"
      v-on:send:del="deleteRecord($event)"
      v-on:enable:create="create = $event"
    />
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useProductosStore } from "src/stores/productos/productos";
import GenericTable from "src/components/custom/GenericTable.vue";

export default {
  name: "salidasPage",
  components: {
    GenericTable,
  },
  setup() {
    const ProductoStore = useProductosStore();

    return {
      ProductoStore,
    };
  },
  data() {
    return {
      filter: ref(""),
      genericRows: [],
      getterData: [],
      formConfig: [
        {
          element: "producto_solicitado",
          type: "text",
          required: true,
          readonly: true,
          label: "Producto Solicitado",
        },
        {
          element: "cantidad_solicitada",
          type: "number",
          readonly: true,
          required: true,
          label: "Precio Unitario",
        },
        {
          element: "estado",
          type: "text",
          readonly: true,
          required: false,
          label: "Unidades Disponibles",
        },
        {
          element: "importe",
          type: "number",
          readonly: true,
          required: false,
          label: "Importe",
        },
        {
          element: "justificacion",
          type: "text",
          readonly: false,
          required: false,
          label: "Justificacion",
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
        await this.ProductoStore.fetchSalidas();
        this.getterData = this.ProductoStore.getSalidas;
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
        await this.ProductoStore.putProductos(ev.rows.id, ev.formData);
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
        await this.ProductoStore.postProductos(ev);
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
        await this.ProductoStore.deleteProductos(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
