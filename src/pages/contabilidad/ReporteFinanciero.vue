<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-card class="q-pa-md">
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">Reportes Estados de Actividades</span>
          <q-separator />
        </q-toolbar-title>
        <q-separator />
      </q-toolbar>

      <q-card-section class="q-px-sm">
        <h6>Elige un periodo y año fiscal</h6>
        <q-separator /><br />

        <div class="row">
          <div class="col-1">Reporte</div>
          <div class="col-3">
            <q-select outlined v-model="model" :options="reporte" />
          </div>
          <div class="col-1 q-ml-lg">Año Fiscal</div>
          <div class="col-3">
            <q-select outlined v-model="model" :options="anho" />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-1">Periodo</div>
          <div class="col-3">
            <q-select outlined v-model="model" :options="periodo" />
          </div>
        </div>
        <q-separator class="q-my-md" />
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            size="md"
            color="grey-4"
            icon="description"
            label="Generar"
            text-color="black"
          ></q-btn>
          <q-btn size="md" color="red" label="Cancelar"></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      toolbar: ref(false),
    };
  },
};
</script>
