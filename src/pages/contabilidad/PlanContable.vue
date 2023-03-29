<template>
  <q-page padding>
    <GenericTable
      v-if="getterData.length > 0"
      ref="child"
      :table-title="$t('accounting.accountingPlan')"
      :form-config="formConfig"
      :title-export="'users'"
      :getter-data="getterData"
      :api-route="'planContable/'"
      :front-route="'/contabilidad/planContable'"
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
import { usePlanContableStore } from "src/stores/PlanContable/PlanContable";

export default defineComponent({
  name: "PlanContablePage",
  components: {
    GenericTable,
  },
  setup() {
    const PlanContableStore = usePlanContableStore();
    const quasar = useQuasar();
    return {
      PlanContableStore,
      quasar,
    };
  },
  data: function () {
    return {
      data: [],
      cuentas: [],
      getterData: [],
      deleteKeys: ["password"],
      formConfig: [
        {
          element: "codigo",
          type: "text",
          required: false,
          skipList: false,
          label: "Código",
        },
        {
          element: "nombre",
          type: "text",
          required: false,
          skipList: false,
          label: "Nombre",
        },
        {
          element: "tipo",
          type: "select",
          required: false,
          skipList: false,
          label: "Tipo",
          multiple: false,
          options: [
            { value: "Ingreso", label: "Ingreso" },
            { value: "Depreciacion", label: "Depreciacion" },
            { value: "Gastos", label: "Gastos" },
            { value: "Otros", label: "Otros" },
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
        await this.PlanContableStore.fetchPlanContable();
        this.getterData = this.PlanContableStore.getPlanContable;
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
        await this.PlanContableStore.putPlanContable(ev.rows.id, ev.formData);
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
        await this.PlanContableStore.postPlanContable(ev);
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
        await this.PlanContableStore.deletePlanContable(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },

    async createSelect() {
      try {
        this.cuentas = [];
        await this.PlanContableStore.fetchCuentas();
        let cuentas = this.PlanContableStore.getCuentas;
        cuentas.forEach(this.setCuentas);
        this.formConfig.push({
          element: "cuenta",
          type: "select",
          multiple: false,
          label: "Cuenta",
          required: false,
          options: this.cuentas,
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

    setCuentas(element, index) {
      this.cuentas.push({
        value: element.id,
        label: String(element.nombre),
      });
    },
  },
});
</script>
