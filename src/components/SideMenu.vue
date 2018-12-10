<template>
  <aside class="submenu menu">
    <CategoryList
      :categories="categories"
      @clickUpdateCategory="onClickUpdateCategory"
    />
    <CreateCategory @clickSaveCategory="onClickSaveCategory" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CategoryList from "@/components/CategoryList.vue";
import CreateCategory from "@/components/CreateCategory.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

@Component({
  components: {
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
