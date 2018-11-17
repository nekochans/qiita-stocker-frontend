<template>
  <section class="side-menu-list">
    <p class="menu-label">カテゴリ一覧</p>
    <ul class="menu-list">
      <Category
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @clickUpdateCategory="onClickUpdateCategory"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";
import Category from "@/components/Category.vue";

@Component({
  components: {
    Category
  }
})
export default class SideMenuList extends Vue {
  @Prop()
  categories!: ICategory[];

  onClickUpdateCategory(updateCategoryPayload: IUpdateCategoryPayload) {
    this.$emit("clickUpdateCategory", updateCategoryPayload);
  }
}
</script>

<style scoped>
.side-menu-list {
  margin-top: 1em;
}
</style>
