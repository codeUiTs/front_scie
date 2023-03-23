<template>
  <q-dialog v-model="bar" persistent full-width>
    <q-card>
      <q-bar class="bg-accent">
        <q-space />
        <q-btn dense flat icon="close" class="text-white" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="q-pt-none">
        <q-table
          :title="title"
          :rows="genericRows"
          :columns="genericColumns"
          :filter="filter"
          flat
          no-data-label="I didn't find anything for you"
          no-results-label="The filter didn't uncover any results"
          row-key="name"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:no-data="{ icon, message, filter }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <q-icon size="2em" name="sentiment_dissatisfied" />
              <span> Well this is sad... {{ message }} </span>
              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, defineComponent } from "vue";
import OM from "src/utils/js/ObjectManager";

export default defineComponent({
  name: "previewModal",
  props: {
    deleteKeys: Array,
    title: String,
    tableData: { type: Array, required: true },
  },
  setup() {
    return {
      icon: ref(false),
      bar: ref(false),
      bar2: ref(false),
      toolbar: ref(false),
      filter: ref(""),
      genericColumns: ref([]),
      genericKeys: ref([]),
    };
  },
  computed: {
    genericRows() {
      if (this.tableData != null) {
        let clone = JSON.stringify(this.tableData);
        let res = OM.ObjectCreator(clone, this.deleteKeys);
        this.delKeys(res);
      }
      let res = OM.ObjectMutator(this.tableData, "null");
      return res;
    },
  },
  methods: {
    delKeys(keys) {
      if (keys) {
        this.genericColumns = keys.columns;
        this.genericKeys = keys.keys;
      }
    },
    show() {
      this.bar = true;
    },
  },
});
</script>
