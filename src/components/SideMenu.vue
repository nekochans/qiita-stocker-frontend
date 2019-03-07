<template>
  <aside class="submenu menu">
    <DefaultMenuList
      :displayCategoryId="displayCategoryId"
      @clickStocksAll="onClickStocksAll"
    />
    <CategoryList
      :categories="categories"
      @clickUpdateCategory="onClickUpdateCategory"
      @clickCategory="onClickCategory"
      @clickDestroyCategory="onClickDestroyCategory"
    />
    <CreateCategory @clickSaveCategory="onClickSaveCategory" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DefaultMenuList from "@/components/DefaultMenuList.vue";
import CategoryList from "@/components/CategoryList.vue";
import CreateCategory from "@/components/CreateCategory.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/actions";

@Component({
  components: {
    DefaultMenuList,
    CategoryList,
    CreateCategory
  }
})
export default class SideMenu extends Vue {
  @Prop()
  categories!: ICategory[];

  @Prop()
  displayCategoryId!: number;

  onClickCategory() {
    this.$emit("clickCategory");
  }

  onClickSaveCategory(category: string) {
    this.$emit("clickSaveCategory", category);
  }

  onClickUpdateCategory(updateCategoryPayload: IUpdateCategoryPayload) {
    this.$emit("clickUpdateCategory", updateCategoryPayload);
  }

  onClickDestroyCategory(categoryId: number) {
    this.$emit("clickDestroyCategory", categoryId);
  }

  onClickStocksAll() {
    this.$emit("clickStocksAll");
  }
}
</script>
