<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-btn label="Clickeame o sí!" color="accent" @click="toolbar = true" />

    <q-dialog v-model="toolbar" full-width>
      <q-card class="q-pa-md">
        <q-toolbar>
          <q-toolbar-title
            ><span class="text-weight-bold">Libro Mayor</span>
            <q-separator />
          </q-toolbar-title>
          <q-separator />

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="q-px-sm">
          <h5>Por cuenta</h5>
          <q-separator /><br />

          <div class="row">
            <div class="col-1 text-h6">De cuenta</div>
            <div class="col-1">|</div>
            <div class="col-3">
              <q-select
                outlined
                v-model="model"
                :options="options"
                label="100.0 Activo"
              />
            </div>
            <div class="col-shrink">
              <q-btn flat size="xs" padding="none"
                ><q-avatar size="sm">
                  <img
                    src="https://fonts.gstatic.com/s/i/materialicons/open_in_new/v21/24px.svg"
                  />
                </q-avatar>
              </q-btn>
            </div>
            <div class="col-1"><p class="text-center">a</p></div>
            <div class="col-3">
              <q-select
                outlined
                v-model="model"
                :options="options"
                label="100.0 Activo"
              />
            </div>
            <div class="col-1">
              <q-btn flat size="xs" padding="none"
                ><q-avatar size="sm">
                  <img
                    src="https://fonts.gstatic.com/s/i/materialicons/open_in_new/v21/24px.svg"
                  />
                </q-avatar>
              </q-btn>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-1 text-h6">De fecha</div>
            <div class="col-1">|</div>
            <div class="col-3">
              <q-select outlined v-model="model" :options="options" label="15/02/23" />
            </div>
            <div class="col-1"><p class="text-center">a</p></div>
            <div class="col-3">
              <q-select outlined v-model="model" :options="options" label="15/02/23" />
            </div>
          </div>
          <br />
          <q-btn
            size="md"
            color="grey-4"
            icon="search"
            label="Buscar"
            text-color="black"
          ></q-btn>
          <br /><br />
          <q-separator /><br />
          <q-separator /><br />
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              size="md"
              color="grey-4"
              icon="description"
              label="PDF"
              text-color="black"
            ></q-btn>
            <q-btn size="md" color="red" label="Cancelar"></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
