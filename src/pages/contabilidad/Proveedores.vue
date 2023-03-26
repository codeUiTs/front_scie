<template>
  <q-page class="q-pa-md">
    <GenericGridTable
      ref="child"
      :table-title="$t('accounting.suppliers')"
      :form-config="formConfig"
      :title-export="$t('accounting.suppliers')"
      :getter-data="getterData"
      :api-route="'proveedor/'"
      :front-route="'/contabilidad/proveedor'"
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
import { useProveedoresStore } from "src/stores/proveedores/proveedores";
import GenericGridTable from "src/components/custom/GenericGridTable.vue";
export default {
  name: "proveedoresPage",
  components: {
    GenericGridTable,
  },
  setup() {
    const proveedorStore = useProveedoresStore();

    return {
      proveedorStore,
    };
  },
  data() {
    return {
      filter: ref(""),
      getterData: [],
      genericColumns: [
        {
          name: "nombre",
          label: "Nombre",
          sortable: true,
          field: "nombre",
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
          element: "direccion",
          type: "text",
          required: true,
          label: "Dirección",
        },
        {
          element: "email",
          type: "text",
          required: false,
          label: "Email",
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
        await this.proveedorStore.fetchProveedores();
        this.getterData = this.proveedorStore.getProveedores;
        this.getterData = this.getterData;
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
        await this.proveedorStore.putProveedores(ev.rows.id, ev.formData);
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
        await this.proveedorStore.postProveedores(ev);
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
        await this.proveedorStore.deleteProveedores(ev);
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
