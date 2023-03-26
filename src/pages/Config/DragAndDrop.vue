<template>
  <q-page class="q-pa-md">
    <q-select
      filled
      v-model="backModule"
      :options="modulesOptions"
      label="Módulo"
      color="accent"
      clearable
    />
    <q-card flat class="q-pa-md" style="background: transparent">
      <div
        style="height: 70vh; cursor: pointer"
        @click="$refs.selectFile.click()"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        id="drop-form"
        @drop="handleFileDrop($event)"
      >
        <q-card-section class="text-center">
          <div class="text-center" v-if="file.name">
            <q-icon name="task" size="40vh" />
            <div class="text-grey text-center text-h4">{{ file.name }}</div>
          </div>
          <div class="text-grey text-center" v-else>
            Haz click para seleccionar el documento o sueltalo aqui
          </div>
        </q-card-section>
      </div>
      <q-card-actions v-show="file.name" align="center">
        <q-btn flat color="negative" label="Eliminar" @click="removeFile()" />
        <q-btn
          v-show="backModule"
          flat
          color="accent"
          label="Guardar"
          @click="submitFile()"
        />
        <q-btn flat color="amber" label="Vista Previa" @click="preview()" />
      </q-card-actions>
    </q-card>
    <input
      hidden
      type="file"
      ref="selectFile"
      @change="handleFileClick()"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    <PreviewModal ref="prev" :tableData="previewData" :title="fileTitle" />
  </q-page>
</template>

<script>
import { ref } from "vue";
import { read, utils } from "xlsx";
import { Notify } from "quasar";
import PreviewModal from "components/custom/PreviewModal.vue";
export default {
  components: {
    PreviewModal,
  },
  data() {
    return {
      fileType: [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
      dragAndDropCapable: false,
      file: {},
      uploadPercentage: 0,
      previewData: {},
      fileTitle: ref("File"),
      backModule: ref(null),
      modulesOptions: [
        {
          label: "Facturas Cliente",
          value: "facturas-cliente",
        },
        {
          label: "Pagos",
          value: "pago",
        },
        {
          label: "Productos Vendibles",
          value: "productoVendible",
        },
        {
          label: "Facturas Proveedor",
          value: "facturas-proveedor",
        },
        {
          label: "Proveedores",
          value: "proveedor",
        },
        {
          label: "Plan Contable",
          value: "planContable",
        },
        {
          label: "Libro Diario",
          value: "libroDiario",
        },
        {
          label: "Transferencias",
          value: "transferencias",
        },
        {
          label: "Productos",
          value: "productos",
        },
        {
          label: "Solicitud de Suministros",
          value: "solicitudSuministro",
        },
        {
          label: "Salidas de Inventario",
          value: "salidaInventario",
        },
        {
          label: "Planificador",
          value: "planificador  ",
        },
      ],
    };
  },

  mounted() {
    this.validateDragAnDrop();
  },

  methods: {
    validateDragAnDrop() {
      this.dragAndDropCapable = this.determineDragAndDropCapable();

      if (this.dragAndDropCapable) {
        this.bindEvents();
      }
    },

    determineDragAndDropCapable() {
      var div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },

    bindEvents() {
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(
        function (evt) {
          document.getElementById("drop-form").addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );
    },

    handleFileDrop(event) {
      let doc = event.dataTransfer.files[0];
      let found = this.fileType.find((element) => element == doc.type);
      if (found != undefined) {
        this.file = event.dataTransfer.files[0];
        this.fileTitle = this.file.name;
      } else {
        this.removeFile();
        Notify.create({
          type: "negative",
          position: "top-right",
          message: "Este tipo de archivo no está permitido",
        });
      }
    },

    handleFileClick() {
      let doc = this.$refs.selectFile.files[0];
      let found = this.fileType.find((element) => element == doc.type);
      if (found != undefined) {
        this.file = this.$refs.selectFile.files[0];
        let form = document.getElementById("drop-form");
        form.classList.add("drag-enter");
        console.log(this.file);
      } else {
        this.removeFile();
        Notify.create({
          type: "negative",
          position: "top-right",
          message: "Este tipo de archivo no está permitido",
        });
      }
    },

    removeFile() {
      let form = document.getElementById("drop-form");
      form.classList.remove("drag-enter");
      this.file = {};
    },

    dragEnter(e) {
      if (e.target.draggable !== true) {
        e.target.classList.add("drag-enter");
      }
    },

    dragLeave(e) {
      e.target.classList.remove("drag-enter");
    },

    submitFile() {
      let userId = sessionStorage.getItem("userId");
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = e.target.result;
        let wb = read(data, { type: "array" });
        let sh = wb.SheetNames;
        let jsonData = utils.sheet_to_json(wb.Sheets[sh[0]]);

        let formData = new FormData();
        formData.append("user_id", userId);
        formData.append("productos", JSON.stringify(jsonData));
        console.log(jsonData);
        // this.cargaMasiva(formData).catch((error) => {
        //   console.error(error);
        // });
      };
      reader.readAsArrayBuffer(this.file);
    },

    async preview() {
      const data = await this.file.arrayBuffer();
      const wb = read(data, { type: "array", cellDates: true });
      const sh = wb.SheetNames;
      let jsonData = utils.sheet_to_json(wb.Sheets[sh[0]]);
      this.previewData = jsonData;

      this.$refs.prev.show();
    },
    selectedModule() {
      console.log(this.backModule);
    },
  },
};
</script>

<style lang="sass">
.drag-enter
  outline: 3px
  outline-style: outset
  outline-color: #21BA45
</style>
