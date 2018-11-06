<template>
  <aside class="submenu menu">
    <SideMenuSearch/>
    <SideMenuList :categories="categories"/>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SideMenuSearch from "@/components/SideMenuSearch.vue";
import SideMenuList from "@/components/SideMenuList.vue";
import { ICategory } from "@/domain/Qiita";

@Component({
  components: {
    SideMenuSearch,
    SideMenuList
  }
})
export default class SideMenu extends Vue {
  @Prop()
  categories!: ICategory[];
}
</script>
