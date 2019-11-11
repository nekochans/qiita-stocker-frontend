<template>
  <div>
    <ConfirmModal
      :is-show="showConfirmation"
      :message="confirmMessage"
      @confirmModal="confirmPagination"
      @cancelModal="cancelaPagination"
    />
    <nav
      v-show="stocksLength && !isLoading"
      class="pagination"
      role="navigation"
    >
      <a
        class="pagination-previous"
        :disabled="!prevPage.page"
        @click="goToPage(prevPage)"
        >Previous</a
      >
      <a
        class="pagination-next"
        :disabled="!nextPage.page"
        @click="goToPage(nextPage)"
        >Next page</a
      >
      <ul class="pagination-list">
        <li>
          <a
            v-show="showFirstEllipsis()"
            class="pagination-link"
            @click="goToPage(firstPage)"
            >{{ firstPage.page }}</a
          >
        </li>
        <li>
          <span v-show="showPrevEllipsis()" class="pagination-ellipsis"
            >&hellip;</span
          >
        </li>
        <li>
          <a
            v-show="prevPage.page"
            class="pagination-link"
            @click="goToPage(prevPage)"
            >{{ prevPage.page }}</a
          >
        </li>
        <li>
          <a class="pagination-link is-current">{{ currentPage }}</a>
        </li>
        <li>
          <a
            v-show="nextPage.page"
            class="pagination-link"
            @click="goToPage(nextPage)"
            >{{ nextPage.page }}</a
          >
        </li>
        <li>
          <span v-show="showNestEllipsis()" class="pagination-ellipsis"
            >&hellip;</span
          >
        </li>
        <li>
          <a
            v-show="showLastPage()"
            class="pagination-link"
            @click="goToPage(lastPage)"
            >{{ lastPage.page }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { Page } from '@/domain/domain'

@Component({
  components: {
    ConfirmModal
  }
})
export default class extends Vue {
  @Prop()
  isLoading!: boolean

  @Prop()
  isCategorizing!: boolean

  @Prop()
  checkedStockArticleIds!: string[]

  @Prop()
  stocksLength!: number

  @Prop()
  currentPage!: number

  @Prop()
  firstPage!: { page: number; perPage: number; relation: string }

  @Prop()
  prevPage!: { page: number; perPage: number; relation: string }

  @Prop()
  nextPage!: { page: number; perPage: number; relation: string }

  @Prop()
  lastPage!: { page: number; perPage: number; relation: string }

  targetPage!: Page
  showConfirmation: boolean = false
  confirmMessage: string =
    '保存せずにページを遷移した場合、現在のストックの選択は解除されます。ページを移動してもよろしいですか？'

  scrollIntoStockList() {
    document.getElementById('pagination-scroll-top')!.scrollIntoView(true)
  }

  showFirstEllipsis() {
    return this.firstPage.page !== this.prevPage.page
  }

  showPrevEllipsis() {
    return this.firstPage.page + 1 < this.prevPage.page
  }

  showNestEllipsis() {
    return this.nextPage.page + 1 < this.lastPage.page
  }

  showLastPage() {
    return this.nextPage.page < this.lastPage.page
  }

  goToPage(page: Page) {
    this.scrollIntoStockList()

    this.targetPage = page

    if (this.isCategorizing && this.checkedStockArticleIds.length)
      return (this.showConfirmation = true)

    return this.$emit('clickGoToPage', this.targetPage)
  }

  confirmPagination(): void {
    this.showConfirmation = false
    this.$emit('clickGoToPage', this.targetPage)
  }

  cancelaPagination(): void {
    this.showConfirmation = false
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
