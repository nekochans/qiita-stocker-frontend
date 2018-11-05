<template>
  <aside class="submenu menu">
    <SideMenuSearch/>
    <SideMenuList />
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideMenuSearch from "@/components/SideMenuSearch.vue";
import SideMenuList from "@/components/SideMenuList.vue";

@Component({
  components: {
    SideMenuSearch,
    SideMenuList
  }
})
export default class SideMenu extends Vue {}
</script>
