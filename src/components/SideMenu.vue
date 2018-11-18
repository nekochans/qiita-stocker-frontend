<template>
  <aside class="submenu menu">
    <SideMenuSearch />
    <CategoryList
      :categories="categories"
      @clickUpdateCategory="onClickUpdateCategory"
    />
    <CreateCategory @clickSaveCategory="onClickSaveCategory" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SideMenuSearch from "@/components/SideMenuSearch.vue";
import CategoryList from "@/components/CategoryList.vue";
import CreateCategory from "@/components/CreateCategory.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

@Component({
  components: {
    SideMenuSearch,
    CategoryList,
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
