<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-card class="q-pa-md">
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">Diario de ventas/compras</span>
          <q-separator />
        </q-toolbar-title>
        <q-separator />
      </q-toolbar>

      <q-card-section class="q-px-sm">
        <h6>Elige un periodo y año fiscal</h6>
        <q-separator />

        <div class="row flex">
          <div class="col-1">Reporte</div>
          <div class="col-3">
            <q-checkbox
              v-model="left1"
              label="Todos los asientos validados"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              color="accent"
              keep-color
            />
            <q-checkbox
              v-model="left2"
              label="Todos los asientos"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              color="accent"
              keep-color
            />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-1">Fecha de inicio</div>
          <div class="col-3 q-mr-lg">
            <q-select outlined v-model="model" :options="periodo" />
          </div>
          <div class="col-1">Fecha de finalización</div>
          <div class="col-3">
            <q-select outlined v-model="model" :options="periodo" />
          </div>
        </div>
        <div class="row flex q-my-md">
          <div class="col-1">Diarios</div>
          <div class="col-3">
            <div style="min-width: 250px; max-width: 300px">
              <!-- <q-badge color="secondary" class="q-mb-md">
                Model: {{ modelMultiple || "[]" }}
              </q-badge> -->

              <q-select
                filled
                v-model="modelMultiple"
                multiple
                :options="options"
                use-chips
                stack-label
                text-color=""
                label="Multiple selection"
              >
                <template v-slot:selected-item="scope">
                  <q-chip
                    removable
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    color="white"
                    text-color="accent"
                    class="q-ma-none"
                    >{{ scope.opt }}
                  </q-chip>
                </template>
              </q-select>
            </div>
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
      left1: ref(true),
      left2: ref(false),
      modelMultiple: ref(["OP 1"]),
      options: ["OP 1", "OP 2", "OP 3", "OP 4", "OP 5"],
    };
  },
};
</script>
