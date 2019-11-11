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
          <CategorizedStockEdit
            :is-loading="isLoading"
            :stocks-length="categorizedStocks.length"
            :is-categorizing="isCategorizing"
            :is-canceling-categorization="isCancelingCategorization"
            :display-categories="displayCategories"
            :checked-stock-article-ids="checkedCategorizedStockArticleIds"
            @clickSetIsCategorizing="onSetIsCategorizing"
            @clickSetIsCancelingCategorization="onSetIsCancelingCategorization"
            @clickCategorize="onClickCategorize"
          />
          <CategorizedStockList
            v-show="!isLoading"
            :stocks="categorizedStocks"
            :is-categorizing="isCategorizing"
            :is-canceling-categorization="isCancelingCategorization"
            @clickCheckStock="onClickCheckStock"
            @clickCancelCategorization="onClickCancelCategorization"
          />
          <Pagination
            :is-loading="isLoading"
            :is-categorizing="isCategorizing"
            :checked-stock-article-ids="checkedCategorizedStockArticleIds"
            :stocks-length="categorizedStocks.length"
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
import CategorizedStockList from '@/components/CategorizedStockList.vue'
import Loading from '@/components/Loading.vue'
import Pagination from '@/components/Pagination.vue'
import CategorizedStockEdit from '@/components/CategorizedStockEdit.vue'
import {
  mapGetters,
  mapActions,
  UpdateCategoryPayload,
  CategorizePayload,
  FetchCategorizedStockPayload
} from '@/store/qiita'
import { Page, Category, CategorizedStock } from '@/domain/domain'

@Component({
  components: {
    SideMenu,
    CategorizedStockList,
    Loading,
    Pagination,
    CategorizedStockEdit
  },
  computed: {
    ...mapGetters([
      'currentPage',
      'firstPage',
      'prevPage',
      'nextPage',
      'lastPage',
      'checkedCategorizedStockArticleIds',
      'displayCategoryId',
      'displayCategories',
      'categories',
      'categorizedStocks',
      'isCategorizing',
      'isCancelingCategorization',
      'isLoading'
    ])
  },
  methods: {
    ...mapActions([
      'fetchCategorizedStock',
      'fetchCategory',
      'saveCategory',
      'updateCategory',
      'destroyCategory',
      'setIsCategorizing',
      'setIsCancelingCategorization',
      'categorize',
      'cancelCategorization',
      'checkStock',
      'resetData',
      'setIsLoadingAction'
    ])
  }
})
export default class extends Vue {
  fetchCategorizedStock!: (
    fetchCategorizedStockPayload: FetchCategorizedStockPayload
  ) => void
  fetchCategory!: () => void
  saveCategory!: (category: string) => void
  updateCategory!: (updateCategoryPayload: UpdateCategoryPayload) => void
  destroyCategory!: (categoryId: number) => void
  setIsCategorizing!: () => void
  setIsCancelingCategorization!: () => void
  categorize!: (categorizePayload: CategorizePayload) => void
  cancelCategorization!: (categorizedStockId: number) => void
  checkStock!: (stock: CategorizedStock) => void
  resetData!: () => void
  setIsLoadingAction!: (isLoading: boolean) => void

  checkedCategorizedStockArticleIds!: string[]
  categories!: Category[]
  displayCategoryId!: number
  currentPage!: number
  categorizedStocks!: CategorizedStock[]

  onClickCategory() {
    this.resetData()
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

  async onClickCategorize(category: Category) {
    try {
      const categorizePayload: CategorizePayload = {
        category,
        stockArticleIds: this.checkedCategorizedStockArticleIds
      }
      await this.categorize(categorizePayload)
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  async onClickCancelCategorization(categorizedStockId: number) {
    try {
      await this.cancelCategorization(categorizedStockId)
      if (!this.categorizedStocks.length && this.currentPage !== 1) {
        this.resetData()
        const fetchCategorizedStockPayload = {
          page: { page: 0, perPage: 0, relation: '' },
          categoryId: this.displayCategoryId
        }
        await this.fetchCategorizedStock(fetchCategorizedStockPayload)
      }
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  onClickCheckStock(stock: CategorizedStock) {
    this.checkStock(stock)
  }

  async fetchOtherPageStock(page: Page) {
    try {
      const fetchCategorizedStockPayload = {
        page,
        categoryId: this.displayCategoryId
      }
      await this.fetchCategorizedStock(fetchCategorizedStockPayload)
      this.setIsLoadingAction(false)
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }

  onSetIsCategorizing() {
    this.setIsCategorizing()
  }

  onSetIsCancelingCategorization() {
    this.setIsCancelingCategorization()
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
