<template>
  <q-page class="q-pa-md">
    <q-table
      :title="$t('inventory.products')"
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
        <q-btn flat color="accent" size="sm" icon="download" />
        <q-btn flat color="accent" icon="sync" size="sm" @click="getData()" />
        <q-btn flat rounded color="accent" icon="add" size="sm" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useProductosVendiblesStore } from "src/stores/productosVendibles/productosVendibles";
export default {
  name: "productosPage",
  setup() {
    const PvStore = useProductosVendiblesStore();

    return {
      PvStore,
    };
  },
  data() {
    return {
      filter: ref(""),
      genericRows: [],
      genericColumns: [
        // {
        //   name: "imagen",
        //   label: "Imágen",
        //   sortable: true,
        //   field: "imagen",
        //   skipList: true,
        // },
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
        await this.PvStore.fetchProductosVendibless();
        this.getterData = this.PvStore.getProductosVendibless;
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
