<template>
  <q-item
    v-if="link == 'Reporte de inventario.pdf' || link == 'Transferencias.xlsx'"
    :class="!$q.dark.isActive ? 'bg-light text-dark' : 'bg-dark text-light'"
    clickable
    tag="a"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" class="text-accent" />
    </q-item-section>

    <q-item-section>
      <a
        :href="`public/docs/${link}`"
        :download="link"
        style="text-decoration: none"
        class="text-info"
        >{{ $t(title) }}</a
      >
      <!-- <q-item-label class="text-info">{{ $t(title) }}</q-item-label> -->
    </q-item-section>
  </q-item>
  <q-item
    v-else
    :class="!$q.dark.isActive ? 'bg-light text-dark' : 'bg-dark text-light'"
    clickable
    tag="a"
    :to="{ name: link }"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" class="text-accent" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-info">{{ $t(title) }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { useRoute } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
  methods: {
    sendTo(rte) {
      this.$router.push({ name: rte });
    },
  },
});
</script>
