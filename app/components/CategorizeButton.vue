<template>
  <div>
    <AlertModal
      :is-show="showAlert"
      :message="alertMessage"
      @closeModal="closeModal"
    />
    <div v-if="isCategorizing">
      <div :class="`select edit-header ${isValidationError && 'is-danger'}`">
        <select v-model="selectedCategory" @change="isValidationError = false">
          <option
            v-for="category in displayCategories"
            :key="category.categoryId"
            :value="category"
            >{{ category.name }}</option
          >
        </select>
      </div>
      <button class="button is-danger button-margin" @click="changeCategory">
        保存
      </button>
      <button
        class="button is-white has-text-grey button-margin"
        @click="cancel"
      >
        キャンセル
      </button>
    </div>
    <div v-show="!isCancelingCategorization" v-else>
      <button class="button is-light button-margin" @click="startEdit">
        カテゴリに分類する
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import AlertModal from '@/components/AlertModal.vue'
import { Category } from '@/domain/domain'

@Component({
  components: {
    AlertModal
  }
})
export default class extends Vue {
  @Prop()
  isCategorizing!: boolean

  @Prop()
  isCancelingCategorization!: boolean

  @Prop()
  displayCategories!: Category[]

  @Prop()
  checkedStockArticleIds!: string[]

  selectedCategory: Category = { categoryId: 0, name: '' }
  isValidationError: boolean = false
  showAlert: boolean = false
  alertMessage: string = 'ストックを1つ以上選択してください。'

  doneEdit() {
    this.isValidationError = false
    this.$emit('clickSetIsCategorizing')
  }

  startEdit() {
    this.doneEdit()
  }

  cancel() {
    this.doneEdit()
  }

  changeCategory() {
    if (!this.selectedCategory.categoryId)
      return (this.isValidationError = true)

    if (!this.checkedStockArticleIds.length) return (this.showAlert = true)

    this.$emit('clickCategorize', this.selectedCategory)
    return this.doneEdit()
  }

  closeModal() {
    this.showAlert = false
  }
}
</script>

<style scoped>
.edit-header {
  margin-right: 10px;
}

.button-margin {
  margin-bottom: 0.5rem;
}
</style>
