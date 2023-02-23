<template>
  <div class="q-pa-md">
    <q-table
      title="Solicitudes"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="sp" :props="props">
            {{ props.row.sp }}
            <q-popup-edit v-model="props.row.sp" v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="producto_solicitado" :props="props">
            {{ props.row.producto_solicitado }}
            <q-popup-edit
              v-model="props.row.producto_solicitado"
              title="Producto solicitado"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="cant_sol" :props="props">
            <div class="text-pre-wrap">{{ props.row.cant_sol }}</div>
            <q-popup-edit v-model="props.row.cant_sol" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="cantidad" :props="props">
            {{ props.row.cantidad }}
            <q-popup-edit
              v-model="props.row.cantidad"
              title="Cantidad"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="cantidad_real" :props="props">
            {{ props.row.cantidad_real }}
            <q-popup-edit
              v-model="props.row.cantidad_real"
              title="Cantidad real"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="medida" :props="props">
            {{ props.row.medida }}
            <q-popup-edit
              v-model="props.row.medida"
              title="Medida"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="partida" :props="props">
            {{ props.row.partida }}
            <q-popup-edit
              v-model="props.row.partida"
              title="Partida"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit> </q-td
          ><q-td key="estado" :props="props">
            {{ props.row.estado }}
            <q-popup-edit
              v-model="props.row.estado"
              title="Estado"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

const columns = [
  {
    name: "sp",
    required: true,
    label: "SP",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "producto_solicitado",
    align: "center",
    label: "Producto solicitado",
    field: "producto_solicitado",
    sortable: true,
  },
  {
    name: "cant_sol",
    label: "Cant.Sol",
    field: "cant_sol",
    style: "width: 10px",
    sortable: true,
  },
  {
    name: "producto_entregado",
    label: "Producto Entregado",
    field: "producto_entregado",
    sortable: true,
  },
  { name: "cantidad", label: "Cantidad", field: "cantidad", sortable: true },
  {
    name: "cantidad_real",
    label: "Cantidad real",
    field: "cantidad_real",
    sortable: true,
  },
  { name: "medida", label: "Medida", field: "medida", sortable: true },
  { name: "partida", label: "Partida", field: "partida", sortable: true },
  { name: "estado", label: "Estado", field: "estado", sortable: true },
];

export default defineComponent({
  name: "solicitud-suministros-table",
  props: {
    rows: Array,
    getterData: Object,
    deleteKeys: Array,
    titleExport: String,
    tableTitle: String,
    checkBox: [String, Array],
    formConfig: Array,
    apiRoute: String,
    frontRoute: String,
  },

  setup() {
    return {
      columns,
    };
  },
});
</script>
