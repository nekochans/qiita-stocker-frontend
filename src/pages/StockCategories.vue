<template>
  <section>
    <AppHeader />
    <main class="container">
      <div class="columns">
        <div class="column is-3">
          <SideMenu
            :categories="categories"
            @clickSaveCategory="onClickSaveCategory"
            @clickUpdateCategory="onClickUpdateCategory"
            @clickCategory="onClickCategory"
          />
        </div>
        <div class="column is-9">
          <Loading :isLoading="isLoading" />
          <StockEdit
            :isLoading="isLoading"
            :stocksLength="categorizedStocks.length"
            :isCategorizing="isCategorizing"
            :categories="categories"
            @clickSetIsCategorizing="onSetIsCategorizing"
            @clickCategorize="onClickCategorize"
          />
          <StockList
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
import StockList from "@/components/StockList.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading.vue";
import {
  ICategory,
  IUncategorizedStock,
  IPage,
  ICategorizedStock
} from "@/domain/qiita";
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
    StockList,
    Pagination,
    Loading
  }
})
export default class StockCategories extends Vue {
  @QiitaGetter
  categories!: ICategory[];

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

  @QiitaAction
  saveCategory!: (category: string) => void;

  @QiitaAction
  fetchCategory!: () => void;

  @QiitaAction
  updateCategory!: (updateCategoryPayload: IUpdateCategoryPayload) => void;

  @QiitaAction
  fetchCategorizedStock!: (
    fetchCategorizedStockPayload: IfetchCategorizedStockPayload
  ) => void;

  @QiitaAction
  setIsCategorizing!: () => void;

  @QiitaAction
  categorize!: (categorizePayload: ICategorizePayload) => void;

  @QiitaAction
  checkStock!: (stock: IUncategorizedStock) => void;

  @QiitaAction
  resetData!: () => void;

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

  onClickCategorize(categoryId: number) {
    const categorizePayload: ICategorizePayload = {
      categoryId: categoryId,
      stockArticleIds: this.checkedCategorizedStockArticleIds
    };
    this.categorize(categorizePayload);
  }

  onClickCheckStock(stock: IUncategorizedStock) {
    this.checkStock(stock);
  }

  fetchOtherPageStock(page: IPage) {
    const query: any = this.$route.params;
    const fetchCategorizedStockPayload = {
      categoryId: query.id,
      page: page
    };

    this.fetchCategorizedStock(fetchCategorizedStockPayload);
  }

  onSetIsCategorizing() {
    this.setIsCategorizing();
  }

  async initializeStock() {
    const query: any = this.$route.params;
    console.log(this.$route);
    const fetchCategorizedStockPayload: IfetchCategorizedStockPayload = {
      categoryId: query.id,
      page: { page: 0, perPage: 0, relation: "" }
    };
    this.fetchCategorizedStock(fetchCategorizedStockPayload);
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
</style>
