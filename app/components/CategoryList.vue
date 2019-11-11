<template>
  <section class="side-menu-list">
    <p class="menu-label">カテゴリ一覧</p>
    <ul class="menu-list">
      <CategoryItem
        v-for="category in categories"
        :key="category.categoryId"
        :category="category"
        @clickUpdateCategory="onClickUpdateCategory"
        @clickDestroyCategory="onClickDestroyCategory"
        @clickCategory="onClickCategory"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Category } from '@/domain/domain'
import CategoryItem from '@/components/Category.vue'
import { UpdateCategoryPayload } from '@/store/qiita'

@Component({
  components: {
    CategoryItem
  }
})
export default class extends Vue {
  @Prop()
  categories!: Category[]

  onClickCategory() {
    this.$emit('clickCategory')
  }

  onClickUpdateCategory(updateCategoryPayload: UpdateCategoryPayload) {
    this.$emit('clickUpdateCategory', updateCategoryPayload)
  }

  onClickDestroyCategory(categoryId: number) {
    this.$emit('clickDestroyCategory', categoryId)
  }
}
</script>

<style scoped>
.side-menu-list {
  margin-top: 1em;
  margin-bottom: 0.5rem;
}
</style>
