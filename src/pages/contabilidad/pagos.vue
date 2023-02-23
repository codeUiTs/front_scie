<template>
  <q-page padding>
    <GenericTable
      v-if="getterData.length > 0"
      ref="child"
      :table-title="'Pagos'"
      :form-config="formConfig"
      :title-export="'users'"
      :getter-data="getterData"
      :api-route="'pagos/'"
      :front-route="'/contabilidad/pagos'"
      v-on:sync:data="getData($event)"
      v-on:send:put="putRecord($event)"
      v-on:send:post="postRecord($event)"
      v-on:send:del="deleteRecord($event)"
    />
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import GenericTable from "src/components/custom/GenericTable.vue";
import { usepagoStore } from "src/stores/pagos/pagoStore";

export default defineComponent({
  name: "PagosPage",
  components: {
    GenericTable,
  },
  setup() {
    const pagoStore = usepagoStore();
    const quasar = useQuasar();
    return {
      pagoStore,
      quasar,
    };
  },
  data: function () {
    return {
      data: [],
      getterData: [],
      deleteKeys: ["password"],
      formConfig: [
        {
          element: "tipo_pago",
          type: "text",
          required: false,
          skipList: false,
          label: "Tipo de Pago",
        },
        {
          element: "diario_pago",
          type: "text",
          required: false,
          skipList: false,
          label: "Diario de Pago",
        },
        {
          element: "destino",
          type: "text",
          required: false,
          skipList: false,
          label: "Destino",
        },
        {
          element: "cantidad",
          label: "Cantidad",
          type: "text",
          required: false,
          skipList: false,
        },
        {
          element: "fecha_pago",
          type: "text",
          required: false,
          skipList: false,
          label: "Fecha de Pago",
        },
        {
          element: "concepto",
          type: "text",
          required: false,
          skipList: false,
          label: "Concepto",
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
        await this.pagoStore.fetchpagos();
        this.getterData = this.pagoStore.getpagos;
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
        await this.pagoStore.putpago(ev.rows.id, ev.formData);
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
        await this.pagoStore.postpago(ev);
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
        await this.pagoStore.deletepago(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
