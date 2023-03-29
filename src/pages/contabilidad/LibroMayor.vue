<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-card class="q-pa-md">
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">Libro Mayor</span>
          <q-separator />
        </q-toolbar-title>
      </q-toolbar>

      <q-card-section class="q-px-sm">
        <h5>Por cuenta</h5>
        <q-separator /><br />

        <div class="row">
          <div class="col-1 text-h6">De cuenta</div>
          <div class="col-1">|</div>
          <div class="col-3">
            <q-select outlined v-model="model" :options="options" label="100.0 Activo" />
          </div>
          <div class="col-shrink"></div>
          <div class="col-1"><p class="text-center">a</p></div>
          <div class="col-3">
            <q-select
              outlined
              v-model="model"
              :options="options"
              label="111.1.00 Activo"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-1 text-h6">De fecha</div>
          <div class="col-1">|</div>
          <div class="col-3">
            <q-select outlined v-model="model" :options="options" label="01/03/23" />
          </div>
          <div class="col-1"><p class="text-center">a</p></div>
          <div class="col-3">
            <q-select outlined v-model="model" :options="options" label="29/03/23" />
          </div>
        </div>
        <br />
        <!-- <q-btn
          size="md"
          color="grey-4"
          icon="search"
          label="Buscar"
          text-color="black"
        ></q-btn> -->
        <br /><br />
        <q-separator /><br />
        <q-separator /><br />
        <div class="q-pa-md q-gutter-sm">
          <q-btn size="md" color="grey-4" icon="description" text-color="black">
            <a
              :href="`public/docs/Diario de ventas_compras.pdf`"
              download="Diario de ventas_compras.pdf"
              style="text-decoration: none"
              class="text-black"
              >PDF</a
            >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";

export default {
  setup() {
    return {
      toolbar: ref(false),
    };
  },
  data: function () {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    downloadReport() {
      api
        .get("facturas-cliente/generateReport/")
        .then((resp) => {
          const type = resp.headers["content-type"];
          const blob = new Blob([resp.data], { type: type, encoding: "UTF-8" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "Libro Mayor.pdf";
          link.click();
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>
