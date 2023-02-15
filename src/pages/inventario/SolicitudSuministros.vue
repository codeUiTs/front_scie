<template>
  <q-page padding>
    <GenericTable
      v-if="getterData.length > 0"
      ref="child"
      :table-title="'Solicitud de Suministros'"
      :form-config="formConfig"
      :title-export="'solicitudSuministros'"
      :getter-data="getterData"
      :api-route="'solicitud-suministros/'"
      :front-route="'/inventario/solicitud-suministros'"
      v-on:sync:data="syncData($event)"
      v-on:send:put="putRecord($event)"
      v-on:send:post="postRecord($event)"
      v-on:send:del="deleteRecord($event)"
    />
    <SolicitudSuministrosTable :rows="rows"> </SolicitudSuministrosTable>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import GenericTable from "src/components/custom/GenericTable.vue";
import { useSolicitudStore } from "src/stores/solicitudSuministros/solicitudStore";
import SolicitudSuministrosTable from "src/components/custom/SolicitudSuministrosTable.vue";

export default defineComponent({
  name: "SolicitudPage",
  components: {
    GenericTable,
    SolicitudSuministrosTable,
  },
  setup() {
    const solicitudStore = useSolicitudStore();
    const quasar = useQuasar();
    return {
      solicitudStore,
      quasar,
    };
  },
  data: function () {
    return {
      data: [],
      rows: [],
      getterData: [],
      deleteKeys: ["password"],
      formConfig: [
        {
          element: "area_solicitante",
          type: "text",
          required: true,
          label: "Área solicitante",
        },
        {
          element: "ubicacion",
          type: "text",
          required: false,
          label: "Ubicación",
        },
        {
          element: "fecha_estimada",
          type: "text",
          required: true,
          label: "Fecha estimada de entrega",
        },
        {
          element: "fecha_salida",
          type: "text",
          required: true,
          label: "Fecha de salida",
        },
        {
          element: "pendiente",
          type: "checkbox",
          required: false,
          label: "Pendiente",
        },

        {
          element: "area_destino",
          label: "Área destino",
          type: "text",
          required: false,
        },

        {
          element: "tipo",
          type: "text",
          required: false,
          label: "Tipo",
        },
        {
          element: "entrega",
          type: "select",
          options: ["1", "2", "3"],
          required: false,
          label: "Entrega",
        },
        {
          element: "departamento_solicitante",
          type: "text",
          required: false,
          label: "Departamento solicitante",
        },
        {
          element: "edificio",
          type: "text",
          required: false,
          label: " Edificio",
        },
        {
          element: "fecha_solicitud",
          type: "text",
          required: false,
          label: "Fecha solicitud",
        },
        {
          element: "fecha_entregado",
          type: "text",
          required: false,
          label: "Fecha de entregado",
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
        await this.useSolicitudStore.fetchSolicitud();
        this.getterData = this.useSolicitudStore.getSolicitud;
        this.rows = this.solicitudStore.getSolicitud;
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
        await this.useSolicitudStore.putSolicitud(ev.rows.id, ev.formData);
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
        await this.useSolicitudStore.postSolicitud(ev);
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
        await this.useSolicitudStore.deleteSolicitud(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
