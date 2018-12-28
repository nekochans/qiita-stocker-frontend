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
          />
        </div>
        <div class="column is-9">
          <Loading :isLoading="isLoading" />
          <StockEdit
            :isLoading="isLoading"
            :stocksLength="stocks.length"
            :isCategorizing="isCategorizing"
            :categories="categories"
            @clickSetIsCategorizing="onSetIsCategorizing"
            @clickCategorize="onClickCategorize"
          />
          <StockList
            :stocks="stocks"
            :isCategorizing="isCategorizing"
            :isLoading="isLoading"
            @clickCheckStock="onClickCheckStock"
          />
          <Pagination
            :isLoading="isLoading"
            :stocksLength="stocks.length"
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
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

import AppHeader from "@/components/AppHeader.vue";
import SideMenu from "@/components/SideMenu.vue";
import StockEdit from "@/components/StockEdit.vue";
import StockList from "@/components/StockList.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading.vue";
import { ICategory, IUncategorizedStock, IPage } from "@/domain/qiita";
import {
  IUpdateCategoryPayload,
  ICategorizePayload
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
export default class Stocks extends Vue {
  @QiitaGetter
  categories!: ICategory[];

  @QiitaGetter
  stocks!: IUncategorizedStock[];

  @QiitaGetter
  isCategorizing!: boolean;

  @QiitaGetter
  isLoading!: boolean;

  @QiitaGetter
  checkedStockArticleIds!: string[];

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
  fetchStock!: (page?: IPage) => void;

  @QiitaAction
  setIsCategorizing!: () => void;

  @QiitaAction
  categorize!: (categorizePayload: ICategorizePayload) => void;

  @QiitaAction
  checkStock!: (stock: IUncategorizedStock) => void;

  onClickSaveCategory(categoryName: string) {
    this.saveCategory(categoryName);
  }

  onClickUpdateCategory(updateCategoryPayload: IUpdateCategoryPayload) {
    this.updateCategory(updateCategoryPayload);
  }

  onClickCategorize(categoryId: number) {
    const categorizePayload: ICategorizePayload = {
      categoryId: categoryId,
      stockArticleIds: this.checkedStockArticleIds
    };
    this.categorize(categorizePayload);
  }

  onClickCheckStock(stock: IUncategorizedStock) {
    this.checkStock(stock);
  }

  fetchOtherPageStock(page: IPage) {
    this.fetchStock(page);
  }

  created() {
    this.initializeCategory();
    this.initializeStock();
  }

  initializeCategory() {
    if (!this.categories.length) {
      this.fetchCategory();
    }
  }

  async initializeStock() {
    await this.fetchStock();
  }

  onSetIsCategorizing() {
    this.setIsCategorizing();
  }
}
</script>

<style scoped>
.container {
  padding-top: 2rem;
}
</style>
