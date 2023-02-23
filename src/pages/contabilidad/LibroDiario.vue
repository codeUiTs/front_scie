<template>
  <q-page>
    <GenericTable
      v-if="getterData.length > 0"
      ref="child"
      :table-title="'Libro Diario'"
      :form-config="formConfig"
      :title-export="'lbs'"
      :getter-data="getterData"
      :delete-keys="deleteKeys"
      :api-route="'libroDiario/'"
      :front-route="'/config/librosdiarios'"
      v-on:sync:data="getData($event)"
      v-on:send:put="putRecord($event)"
      v-on:send:post="postRecord($event)"
      v-on:send:del="deleteRecord($event)"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import GenericTable from "src/components/custom/GenericTable.vue";
import { uselbStore } from "src/stores/libroDiario/lbStore";

export default defineComponent({
  name: "libroDiarioPage",
  components: {
    GenericTable,
  },
  setup() {
    const lbStore = uselbStore();
    const quasar = useQuasar();
    return {
      lbStore,
      quasar,
    };
  },
  data: function () {
    return {
      data: [],
      getterData: [],
      deleteKeys: [],
      formConfig: [
        {
          element: "diario",
          type: "text",
          required: true,
          label: "Diario",
        },
        {
          element: "fecha_inicio",
          type: "text",
          required: false,
        },
        {
          element: "fecha_fin",
          type: "text",
          required: true,
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
        await this.lbStore.fetchLbs();
        this.getterData = this.lbStore.getLbs;
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
        await this.lbStore.putLb(ev.rows.id, ev.formData);
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
        await this.lbStore.postLb(ev);
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
        await this.lbStore.deleteLb(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
