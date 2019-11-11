<template>
  <aside class="submenu menu">
    <DefaultMenuList
      :display-category-id="displayCategoryId"
      @clickStocksAll="onClickStocksAll"
    />
    <CategoryList
      :categories="categories"
      @clickUpdateCategory="onClickUpdateCategory"
      @clickDestroyCategory="onClickDestroyCategory"
      @clickCategory="onClickCategory"
    />
    <CreateCategory @clickSaveCategory="onClickSaveCategory" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Category } from '@/domain/domain'
import DefaultMenuList from '@/components/DefaultMenuList.vue'
import CategoryList from '@/components/CategoryList.vue'
import CreateCategory from '@/components/CreateCategory.vue'
import { UpdateCategoryPayload } from '@/store/qiita'

@Component({
  components: {
    DefaultMenuList,
    CategoryList,
    CreateCategory
  }
})
export default class extends Vue {
  @Prop()
  displayCategoryId!: number

  @Prop()
  categories!: Category[]

  onClickCategory() {
    this.$emit('clickCategory')
  }

  onClickSaveCategory(category: string) {
    this.$emit('clickSaveCategory', category)
  }

  onClickUpdateCategory(updateCategoryPayload: UpdateCategoryPayload) {
    this.$emit('clickUpdateCategory', updateCategoryPayload)
  }

  onClickDestroyCategory(categoryId: number) {
    this.$emit('clickDestroyCategory', categoryId)
  }

  onClickStocksAll() {
    this.$emit('clickStocksAll')
  }
}
</script>
