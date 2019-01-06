<template>
  <section>
    <AppHeader />
    <main class="container">
      <div class="columns">
        <div class="column is-3 column-padding">
          <SideMenu
            :categories="categories"
            :displayCategoryId="displayCategoryId"
            @clickSaveCategory="onClickSaveCategory"
            @clickUpdateCategory="onClickUpdateCategory"
            @clickCategory="onClickCategory"
            @clickDestroyCategory="onClickDestroyCategory"
            @clickStocksAll="onClickStocksAll"
          />
        </div>
        <div class="column is-9 column-padding">
          <Loading :isLoading="isLoading" />
          <StockEdit
            :isLoading="isLoading"
            :stocksLength="categorizedStocks.length"
            :isCategorizing="isCategorizing"
            :categories="categories"
            :displayCategories="displayCategories"
            @clickSetIsCategorizing="onSetIsCategorizing"
            @clickCategorize="onClickCategorize"
          />
          <CategorizedStockList
            :stocks="categorizedStocks"
            :isCategorizing="isCategorizing"
            :isLoading="isLoading"
            @clickCheckStock="onClickCheckStock"
          />
          <Pagination
            :isLoading="isLoading"
            :stocksLength="categorizedStocks.length"
            :currentPage="currentPage"
            :firstPage="firstPage"
            :prevPage="prevPage"
            :nextPage="nextPage"
            :lastPage="lastPage"
            @clickGoToPage="fetchOtherPageStock"
          />
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

import AppHeader from "@/components/AppHeader.vue";
import SideMenu from "@/components/SideMenu.vue";
import StockEdit from "@/components/StockEdit.vue";
import CategorizedStockList from "@/components/CategorizedStockList.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading.vue";
import { ICategory, IPage, ICategorizedStock } from "@/domain/qiita";
import {
  IUpdateCategoryPayload,
  ICategorizePayload,
  IfetchCategorizedStockPayload
} from "@/store/modules/qiita";

const QiitaAction = namespace("QiitaModule", Action);
const QiitaGetter = namespace("QiitaModule", Getter);

@Component({
  components: {
    AppHeader,
    SideMenu,
    StockEdit,
    CategorizedStockList,
    Pagination,
    Loading
  }
})
export default class StockCategories extends Vue {
  @QiitaGetter
  categories!: ICategory[];

  @QiitaGetter
  displayCategories!: ICategory[];

  @QiitaGetter
  categorizedStocks!: ICategorizedStock[];

  @QiitaGetter
  isCategorizing!: boolean;

  @QiitaGetter
  isLoading!: boolean;

  @QiitaGetter
  checkedCategorizedStockArticleIds!: string[];

  @QiitaGetter
  currentPage!: number;

  @QiitaGetter
  firstPage!: IPage;

  @QiitaGetter
  prevPage!: IPage;

  @QiitaGetter
  nextPage!: IPage;

  @QiitaGetter
  lastPage!: IPage;

  @QiitaGetter
  displayCategoryId!: number;

  @QiitaAction
  saveCategory!: (category: string) => void;

  @QiitaAction
  fetchCategory!: () => void;

  @QiitaAction
  updateCategory!: (updateCategoryPayload: IUpdateCategoryPayload) => void;

  @QiitaAction
  destroyCategory!: (categoryId: number) => void;

  @QiitaAction
  fetchCategorizedStock!: (
    fetchCategorizedStockPayload: IfetchCategorizedStockPayload
  ) => void;

  @QiitaAction
  setIsCategorizing!: () => void;

  @QiitaAction
  categorize!: (categorizePayload: ICategorizePayload) => void;

  @QiitaAction
  checkCategorizedStock!: (stock: ICategorizedStock) => void;

  @QiitaAction
  resetData!: () => void;

  @QiitaAction
  saveDisplayCategoryId!: (categoryId: number) => void;

  @Watch("$route")
  onRouteChanged() {
    this.initializeStock();
  }

  onClickCategory() {
    this.resetData();
  }

  onClickSaveCategory(categoryName: string) {
    this.saveCategory(categoryName);
  }

  onClickUpdateCategory(updateCategoryPayload: IUpdateCategoryPayload) {
    this.updateCategory(updateCategoryPayload);
  }

  onClickDestroyCategory(categoryId: number) {
    this.destroyCategory(categoryId);
  }

  onClickCategorize(categoryId: number) {
    const categorizePayload: ICategorizePayload = {
      categoryId: categoryId,
      stockArticleIds: this.checkedCategorizedStockArticleIds
    };
    this.categorize(categorizePayload);
  }

  onClickCheckStock(stock: ICategorizedStock) {
    this.checkCategorizedStock(stock);
  }

  fetchOtherPageStock(page: IPage) {
    const query: any = this.$route.params;
    const fetchCategorizedStockPayload = {
      categoryId: parseInt(query.id),
      page
    };

    this.fetchCategorizedStock(fetchCategorizedStockPayload);
  }

  onSetIsCategorizing() {
    this.setIsCategorizing();
  }

  onClickStocksAll() {
    this.resetData();
  }

  async initializeStock() {
    const query: any = this.$route.params;
    const categoryId: number = parseInt(query.id);
    const fetchCategorizedStockPayload: IfetchCategorizedStockPayload = {
      categoryId: categoryId,
      page: { page: 0, perPage: 0, relation: "" }
    };
    this.fetchCategorizedStock(fetchCategorizedStockPayload);
    this.saveDisplayCategoryId(categoryId);
  }

  initializeCategory() {
    if (!this.categories.length) {
      this.fetchCategory();
    }
  }

  created() {
    this.initializeCategory();
    this.initializeStock();
  }
}
</script>

<style scoped>
.container {
  padding-top: 2rem;
}

.column-padding {
  padding-left: 1.25rem;
}
</style>
