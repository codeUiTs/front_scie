<template>
  <q-page padding>
    <GenericTable
      v-if="getterData.length > 0"
      ref="child"
      :table-title="$t('accounting.customerInvoices')"
      :form-config="formConfig"
      :title-export="'facturas-cliente'"
      :getter-data="getterData"
      :delete-keys="deleteKeys"
      :api-route="'facturas-cliente/'"
      :front-route="'/contabilidad/facturaCliente'"
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
import { usefcStore } from "src/stores/facturasCliente/fcStore";

export default defineComponent({
  name: "FacturasCliente",
  components: {
    GenericTable,
  },
  setup() {
    const fcStore = usefcStore();
    const quasar = useQuasar();
    return {
      fcStore,
      quasar,
    };
  },
  data: function () {
    return {
      data: [],
      getterData: [],
      clientes: [],
      deleteKeys: ["producto"],
      formConfig: [
        {
          element: "fecha_factura",
          type: "date",
          label: "Fecha de la factura",
          required: false,
        },
        {
          element: "comercial",
          type: "text",
          label: "Nombre",
          required: false,
        },
        {
          element: "fecha_vencimiento",
          type: "date",
          label: "Fecha de vencimiento",
          required: false,
        },
        {
          element: "total",
          type: "text",
          label: "Total",
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
        await this.fcStore.fetchfcs();
        this.getterData = this.fcStore.getfcs;
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
      try {
        await this.fcStore.putfc(ev.rows.id, ev.formData);
        await this.getData();
      } catch (error) {
        if (error.response.data.error) {
          let msg = error.response.data.error;
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
    async postRecord(ev) {
      try {
        await this.fcStore.postfc(ev);
        this.$refs.child.cancel();
        await this.getData();
      } catch (error) {
        if (error.response.data.error) {
          let msg = error.response.data.error;
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
        await this.fcStore.deletefc(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },

    async createSelect() {
      try {
        this.clientes = [];
        await this.fcStore.fetchClientes();
        let clientes = this.fcStore.getClientes;
        clientes.forEach(this.setClientes);
        this.formConfig.push({
          element: "cliente",
          type: "select",
          multiple: false,
          label: "Cliente",
          required: true,
          options: this.clientes,
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

    setClientes(element, index) {
      this.clientes.push({
        value: element.id,
        label: String(element.nombre),
      });
    },
  },
});
</script>
