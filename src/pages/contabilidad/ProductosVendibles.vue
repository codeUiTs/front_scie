<template>
  <q-page class="q-pa-md">
    <q-table
      :title="$t('accounting.salableProducts')"
      v-show="!create"
      :tittle="tableTitle"
      :rows="genericRows"
      :columns="genericColumns"
      row-key="id"
      :filter="filter"
      grid
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn flat color="accent" icon="sync" size="sm" @click="getData()" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useProductosStore } from "src/stores/productos/productos";
export default {
  name: "productosVendibles",
  setup() {
    const PvStore = useProductosStore();

    return {
      PvStore,
    };
  },
  data() {
    return {
      filter: ref(""),
      genericRows: [],
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
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        await this.PvStore.fetchProductosVendibles();
        this.getterData = this.PvStore.getProductosVendibles;
        this.genericRows = this.getterData;
      } catch (err) {
        if (err.response.data.error) {
          this.quasar.notify({
            type: "negative",
            message: err.response.data.error,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
