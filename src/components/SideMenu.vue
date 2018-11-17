<template>
  <aside class="submenu menu">
    <SideMenuSearch />
    <SideMenuList
      :categories="categories"
      @clickUpdateCategory="onClickUpdateCategory"
    />
    <CreateCategory @clickSaveCategory="onClickSaveCategory" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SideMenuSearch from "@/components/SideMenuSearch.vue";
import SideMenuList from "@/components/SideMenuList.vue";
import CreateCategory from "@/components/CreateCategory.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

@Component({
  components: {
    SideMenuSearch,
    SideMenuList,
    CreateCategory
  }
})
export default class SideMenu extends Vue {
  @Prop()
  categories!: ICategory[];

  onClickSaveCategory(category: string) {
    this.$emit("clickSaveCategory", category);
  }

  onClickUpdateCategory(updateCategoryPayload: IUpdateCategoryPayload) {
    this.$emit("clickUpdateCategory", updateCategoryPayload);
  }
}
</script>
