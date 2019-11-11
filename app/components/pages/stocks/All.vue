<template>
  <section>
    <main class="container">
      <div class="columns">
        <div class="column is-3">
          <SideMenu
            :display-category-id="displayCategoryId"
            :categories="categories"
            @clickSaveCategory="onClickSaveCategory"
            @clickUpdateCategory="onClickUpdateCategory"
            @clickDestroyCategory="onClickDestroyCategory"
            @clickCategory="onClickCategory"
            @clickStocksAll="onClickStocksAll"
          />
        </div>
        <div class="column is-9">
          <Loading v-show="isLoading" />
          <StockEdit
            :is-loading="isLoading"
            :stocks-length="uncategorizedStocks.length"
            :is-categorizing="isCategorizing"
            :is-canceling-categorization="isCancelingCategorization"
            :display-categories="displayCategories"
            :checked-stock-article-ids="checkedStockArticleIds"
            @clickSetIsCategorizing="onSetIsCategorizing"
            @clickCategorize="onClickCategorize"
          />
          <StockList
            v-show="!isLoading"
            :stocks="uncategorizedStocks"
            :is-categorizing="isCategorizing"
            @clickCheckStock="onClickCheckStock"
          />
          <Pagination
            :is-loading="isLoading"
            :is-categorizing="isCategorizing"
            :checked-stock-article-ids="checkedStockArticleIds"
            :stocks-length="uncategorizedStocks.length"
            :current-page="currentPage"
            :first-page="firstPage"
            :prev-page="prevPage"
            :next-page="nextPage"
            :last-page="lastPage"
            @clickGoToPage="fetchOtherPageStock"
          />
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SideMenu from '@/components/SideMenu.vue'
import StockList from '@/components/StockList.vue'
import Loading from '@/components/Loading.vue'
import Pagination from '@/components/Pagination.vue'
import StockEdit from '@/components/StockEdit.vue'
import {
  mapGetters,
  mapActions,
  UpdateCategoryPayload,
  CategorizePayload
} from '@/store/qiita'
import { Page, Category, UncategorizedStock } from '@/domain/domain'

@Component({
  components: {
    SideMenu,
    StockList,
    Loading,
    Pagination,
    StockEdit
  },
  computed: {
    ...mapGetters([
      'currentPage',
      'firstPage',
      'prevPage',
      'nextPage',
      'lastPage',
      'checkedStockArticleIds',
      'displayCategoryId',
      'displayCategories',
      'categories',
      'uncategorizedStocks',
      'isCategorizing',
      'isCancelingCategorization',
      'isLoading'
    ])
  },
  methods: {
    ...mapActions([
      'fetchUncategorizedStocks',
      'fetchCategory',
      'saveCategory',
      'updateCategory',
      'destroyCategory',
      'setIsCategorizing',
      'categorize',
      'checkStock',
      'resetData',
      'setIsLoadingAction'
    ])
  }
})
export default class extends Vue {
  fetchUncategorizedStocks!: (page?: Page) => void
  fetchCategory!: () => void
  saveCategory!: (category: string) => void
  updateCategory!: (updateCategoryPayload: UpdateCategoryPayload) => void
  destroyCategory!: (categoryId: number) => void
  setIsCategorizing!: () => void
  categorize!: (categorizePayload: CategorizePayload) => void
  checkStock!: (stock: UncategorizedStock) => void
  resetData!: () => void
  setIsLoadingAction!: (isLoading: boolean) => void

  checkedStockArticleIds!: string[]
  categories!: Category[]

  onClickCategory() {
    this.resetData()
  }

  async fetchOtherPageStock(page: Page) {
    try {
      await this.fetchUncategorizedStocks(page)
      this.setIsLoadingAction(false)
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  async onClickSaveCategory(categoryName: string) {
    try {
      await this.saveCategory(categoryName)
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  async onClickUpdateCategory(updateCategoryPayload: UpdateCategoryPayload) {
    try {
      await this.updateCategory(updateCategoryPayload)
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  async onClickDestroyCategory(categoryId: number) {
    try {
      await this.destroyCategory(categoryId)
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  onClickCheckStock(stock: UncategorizedStock) {
    this.checkStock(stock)
  }

  onSetIsCategorizing() {
    this.setIsCategorizing()
  }

  async onClickCategorize(category: Category) {
    try {
      const categorizePayload: CategorizePayload = {
        category,
        stockArticleIds: this.checkedStockArticleIds
      }
      await this.categorize(categorizePayload)
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  onClickStocksAll() {
    this.resetData()
  }

  async initializeCategory() {
    try {
      await this.fetchCategory()
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  async created() {
    if (!this.categories.length) {
      await this.initializeCategory()
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 1rem;
}
</style>
