<template>
  <q-page class="q-pa-md">
    <q-table
      title="Proveedores"
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
      <template v-slot:item="props">
        <div class="q-pa-xs col-md-4">
          <q-card>
            <div class="q-pa-md flex">
              <q-img
                src="src/assets/avatar.svg"
                spinner-color="white"
                width="90px"
                img-class="my-custom-image"
                class="rounded-borders"
              />
              <br />
              <q-card-section class="q-pa-md">
                <q-item-label caption class="text-grey q-mx-md"> Nombre </q-item-label>
                <br />
                <q-item-label style="fontsize: 12px" class="q-mx-md"
                  >{{ props.row.nombre }} <br />
                </q-item-label>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useProductosVendiblesStore } from "src/stores/productosVendibles/productosVendibles";
export default {
  name: "proveedoresPage",
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
