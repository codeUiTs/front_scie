<template>
  <q-page class="q-pa-md">
    <GenericGridTable
      ref="child"
      :table-title="$t('inventory.products')"
      :form-config="formConfig"
      :title-export="$t('inventory.products')"
      :getter-data="getterData"
      :api-route="'producto/'"
      :front-route="'/inventario/producto'"
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
import GenericGridTable from "src/components/custom/GenericGridTable.vue";

export default {
  name: "productosPage",
  components: {
    GenericGridTable,
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
      genericColumns: [
        {
          name: "nombre",
          label: "Nombre",
          sortable: true,
          field: "nombre",
        },
        {
          name: "precio_unitario",
          label: "Precio Unitario",
          sortable: true,
          field: "precio_unitario",
        },
        {
          name: "unidades_disponibles",
          label: "Unidades Disponibles",
          sortable: true,
          field: "unidades_disponibles",
        },
      ],
      formConfig: [
        {
          element: "nombre",
          type: "text",
          required: true,
          label: "Nombre",
        },
        {
          element: "precio_unitario",
          type: "number",
          required: true,
          label: "Precio Unitario",
        },
        {
          element: "unidades_disponibles",
          type: "text",
          required: false,
          label: "Unidades Disponibles",
        },
        {
          element: "vendible",
          type: "checkbox",
          required: false,
          label: "Vendible",
        },
        {
          element: "comprable",
          type: "checkbox",
          required: false,
          label: "Comprable",
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
        await this.ProductoStore.fetchProductos();
        this.getterData = this.ProductoStore.getProductos;
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
