<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      :class="$q.dark.isActive ? 'bg-dark text-light' : 'bg-light text-dark'"
      height-hint="98"
      bordered
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          :class="$q.dark.isActive ? 'text-accent' : 'text-dark'"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <q-img src="~/assets/icon.png" />
          </q-avatar>
          {{ $t("main.appTitle") }}
        </q-toolbar-title>
        <div class="q-px-md">
          <q-icon name="translate" size="25px" class="q-mx-md" @click="setLanguaje()" />
          <q-icon
            v-if="$q.dark.isActive"
            name="brightness_5"
            size="25px"
            @click="$q.dark.toggle"
          />
          <q-icon
            tag="theme"
            v-else
            name="brightness_2"
            size="25px"
            @click="$q.dark.toggle"
          />
        </div>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn dense flat no-wrap no-caps :label="authStore.getUserName">
            <q-icon name="arrow_drop_down" size="16px" />
            <q-menu auto-close>
              <q-list dense>
                <q-separator />
                <q-item clickable class="GL__menu-link" to="/perfil">
                  <q-item-section>Perfil</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" @click="logout()">
                  <q-item-section>Cerrar sesion</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab
          @click="selectMenu('contabilidad')"
          :label="$t('tabsMenu.accounting')"
        />
        <q-route-tab
          @click="selectMenu('inventario')"
          :label="$t('tabsMenu.inventory')"
        />
        <q-route-tab @click="selectMenu('config')" :label="$t('tabsMenu.config')" />
      </q-tabs>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
    >
      <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch } from "vue";
import EssentialLink from "src/components/EssentialLink.vue";
import { useAuthStore } from "src/stores/auth/authStore";
import { useRoute } from "vue-router";
import {
  accountingList,
  inventoryList,
  configList,
  noMenu,
} from "src/utils/traduction/traductionObj";

export default {
  components: {
    EssentialLink,
  },
  data() {
    return { essLink: [] };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const authStore = useAuthStore();

    const route = useRoute();
    let routeName = ref("home");
    let essentialLinks = ref(noMenu);
    watch(
      () => routeName.value,
      (route) => {
        if (route == "contabilidad") {
          essentialLinks.value = accountingList;
          leftDrawerOpen.value = true;
        } else if (route == "inventario") {
          essentialLinks.value = inventoryList;
          leftDrawerOpen.value = true;
        } else if (route == "config") {
          essentialLinks.value = configList;
          leftDrawerOpen.value = true;
        } else {
          leftDrawerOpen.value = false;
        }
      }
    );

    return {
      route,
      routeName,
      authStore,
      essentialLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  methods: {
    setLanguaje() {
      let lang = this.$root.$i18n.locale == "en-US" ? "es-MX" : "en-US";
      this.$root.$i18n.locale = lang;
    },
    selectMenu(route) {
      this.routeName = route;
    },
    logout() {
      this.authStore.signOut();
      this.$router.push("/login");
    },
  },
};
</script>
