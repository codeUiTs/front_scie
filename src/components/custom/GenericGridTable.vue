<template>
  <div class="q-pa-md">
    <q-table
      v-show="!create"
      :title="tableTitle"
      :rows="genericRows"
      :columns="genericColumns"
      row-key="id"
      :filter="filter"
      :no-data-label="$t('generic.noData')"
      :no-results-label="$t('generic.noFilterData')"
      grid
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          color="accent"
          size="sm"
          icon="download"
          @click="exportTable(genericColumns, genericRows, titleExport)"
        />
        <q-btn flat color="accent" icon="sync" size="sm" @click="syncData" />
        <q-btn flat rounded color="accent" icon="add" size="sm" @click="create = true" />
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card @click="SelectItem(props.row)" style="height: 11vh; cursor: pointer">
            <q-card-section>
              <strong style="fontsize: 10px">{{ props.row.nombre }} </strong>
            </q-card-section>
          </q-card>
        </div>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-error q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> {{ $t("generic.noFiltered") }}... {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
    <q-card v-show="create" class="my-card">
      <div class="bg-accent text-white">
        <q-toolbar>
          <q-breadcrumbs active-color="white">
            <q-breadcrumbs-el
              clickable
              :label="tableTitle"
              icon="post_add"
              :to="frontRoute"
              @click="cancel()"
            />
            <q-breadcrumbs-el :label="state_item" />
          </q-breadcrumbs>
          <q-toolbar-title> </q-toolbar-title>
          <q-btn flat round dense>
            <q-icon name="more_vert" />
            <q-menu cover auto-close>
              <q-list>
                <q-item
                  clickable
                  @click="exportTable(genericColumns, [genericRows], titleExport)"
                >
                  <q-item-section>Exportar</q-item-section>
                </q-item>
                <q-item clickable @click="confirm_delete = true">
                  <q-item-section>Eliminar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </div>
      <q-card-section>
        <q-form class="q-gutter-md" @submit="Save">
          <div class="q-pa-md">
            <div class="q-gutter-sm row">
              <div v-for="item in genericKeysForm" :key="item.label">
                <div v-if="item.type == 'text' || item.type == 'number'">
                  <q-input
                    v-if="item.required == true"
                    v-model="form_data[item.key]"
                    :type="item.type"
                    filled
                    dense
                    :label="`${item.label} *`"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
                  />
                  <q-input
                    v-else
                    :type="item.type"
                    v-model="form_data[item.key]"
                    filled
                    dense
                    :label="item.key"
                  />
                </div>
                <div v-if="item.type == 'select'">
                  <q-select
                    v-if="item.required == true"
                    v-model="form_data[item.key]"
                    :options="item.options"
                    filled
                    dense
                    :label="`${item.label} *`"
                    option-value="value"
                    option-label="label"
                    emit-value
                    map-options
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
                    style="width: 100px"
                  />
                  <q-select
                    v-else
                    v-model="form_data[item.key]"
                    :options="item.options"
                    filled
                    dense
                    :label="item.label"
                    option-value="value"
                    option-label="label"
                    emit-value
                    map-options
                    style="width: 100px"
                  />
                </div>
                <div v-if="item.type == 'checkbox'">
                  <q-checkbox
                    v-if="item.required == true"
                    v-model="form_data[item.key]"
                    color="accent"
                    filled
                    dense
                    :label="`${item.label} *`"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
                  />
                  <q-checkbox
                    v-else
                    v-model="form_data[item.key]"
                    color="accent"
                    filled
                    dense
                    :label="`${item.label}`"
                  />
                </div>
                <div v-if="item.type == 'date'">
                  <q-input filled v-model="form_data[item.key]" :label="item.label">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="form_data[item.key]"
                            color="accent"
                            mask="YYYY-MM-DD"
                          >
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="accent" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
          <q-card-actions align="left">
            <q-btn
              label="Guardar"
              outline
              size="sm"
              type="submit"
              dense
              flat
              :color="$q.dark.isActive ? 'accent' : 'dark'"
            />
            <q-btn
              label="Cancelar"
              outline
              size="sm"
              dense
              color="red"
              flat
              @click="cancel()"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
      <q-separator />
      <div class="q-ma-lg">
        <CommitsComponent
          :track_visibility="track_visibility"
          :form_data_original="form_data_original"
          :form_data="form_data"
          :destination_url="`${apiRoute + form_data.id}/robject/`"
          :commits="commits"
        />
      </div>
    </q-card>
    <q-dialog v-model="confirm_delete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm"
            >Esta apunto de eliminar este registro. ¿Desea continuar?</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Continuar" color="red" @click="deleteItem()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Export from "src/utils/js/ExportTable";
import Track from "src/utils/js/TrackVisibility";
import OM from "src/utils/js/ObjectManager";
import { defineComponent, ref } from "vue";
import CommitsComponent from "src/components/custom/CommitsComponent.vue";

export default defineComponent({
  name: "genericGrid",
  props: {
    getterData: Object,
    deleteKeys: Array,
    titleExport: String,
    tableTitle: String,
    checkBox: [String, Array],
    formConfig: Array,
    apiRoute: String,
    frontRoute: String,
  },
  components: {
    CommitsComponent,
  },
  data: function () {
    return {
      data: [],
      track_visibility: [],
      filter: ref(""),
      genericColumns: [],
      genericKeys: [],
      genericKeysForm: [],
      create: false,
      confirm_delete: false,
      update: null,
      state_item: "Nuevo",
      cbIsObject: false,
      form_data_original: {},
      form_data: {},
      commits: [],
    };
  },
  created() {},
  mounted() {},

  computed: {
    genericRows() {
      this.getCheckBox();
      if (this.getterData != null) {
        let clone = JSON.stringify(this.getterData);
        let res = OM.ObjectCreator(clone, this.deleteKeys);

        this.delKeys(res);
        this.mutateObject(clone);
        this.mutateCommits();
      }
      let res = OM.ObjectMutator(this.getterData, "password");
      return res;
    },
  },
  watch: {},
  methods: {
    delKeys(keys) {
      if (keys) {
        this.genericColumns = keys.columns;
        this.genericKeys = keys.keys;
      }
    },
    mutateObject(obj) {
      try {
        let res = OM.ObjectCreatorForm(this.formConfig, obj);
        this.genericKeysForm = res;
      } catch (error) {
        console.error(error);
      }
    },
    mutateCommits() {
      let cloneFd = JSON.stringify(this.form_data);
      let fd = JSON.parse(cloneFd);
      this.track_visibility = Object.keys(fd);
    },
    exportTable(columns, rows, name) {
      Export.exportTable(columns, rows, name);
    },
    syncData() {
      this.$emit("sync:data");
    },
    getCheckBox() {
      this.cbIsObject = typeof this.checkBox == "object" ? true : false;
    },
    cancel() {
      this.state_item = "Nuevo";
      this.create = false;
      this.update = false;
      this.form_data = {};
      this.commits = [];
      this.$emit("enable:create", this.create);
    },
    SelectItem(item) {
      this.form_data_original = item;
      this.state_item = item.nombre;
      this.create = true;
      this.update = true;
      this.commits = item.r_object.commits;
      for (const key in this.genericKeys) {
        for (const k in item) {
          if (this.genericKeys[key] == k) {
            this.form_data[this.genericKeys[key]] = item[k];
          }
        }
      }
      this.$emit("enable:create", this.create);
    },

    Save() {
      var action = "post";
      if (this.update === true) {
        action = "put";
      }
      let formData = new FormData();
      let keys = Object.keys(this.form_data);
      for (const val in this.form_data) {
        let dat = this.form_data[val];
        if (dat == null) {
          dat = "";
        }
        formData.append(`${val}`, dat);
      }
      let clone = JSON.stringify(this.form_data);
      let fd = JSON.parse(clone);
      delete fd.id;
      let r_object = Track.TrackVisibility(
        action,
        Object.keys(fd),
        this.form_data_original,
        fd
      );
      formData.append("r_object", JSON.stringify(r_object));

      if (this.update === true) {
        this.$emit("send:put", { rows: this.form_data, formData: formData });
      } else {
        this.$emit("send:post", formData);
      }
    },
    deleteItem() {
      this.$emit("send:del", this.form_data.id);
    },
  },
});
</script>
