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
          <StockEdit
            v-show="stocks.length"
            :isCategorizing="isCategorizing"
            :categories="categories"
            @clickSetIsCategorizing="onSetIsCategorizing"
          />
          <StockList :stocks="stocks" :isCategorizing="isCategorizing" />
          <Pagination v-show="stocks.length" />
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
import { IStock, ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

const QiitaAction = namespace("QiitaModule", Action);
const QiitaGetter = namespace("QiitaModule", Getter);

@Component({
  components: {
    AppHeader,
    SideMenu,
    StockEdit,
    StockList,
    Pagination
  }
})
export default class Stocks extends Vue {
  @QiitaGetter
  categories!: ICategory[];

  @QiitaGetter
  stocks!: IStock[];

  @QiitaGetter
  isCategorizing!: boolean;

  @QiitaAction
  saveCategory!: (category: string) => void;

  @QiitaAction
  fetchCategory!: () => void;

  @QiitaAction
  updateCategory!: (updateCategoryPayload: IUpdateCategoryPayload) => void;

  @QiitaAction
  fetchStock!: () => void;

  @QiitaAction
  setIsCategorizing!: () => void;

  onClickSaveCategory(categoryName: string) {
    this.saveCategory(categoryName);
  }

  onClickUpdateCategory(updateCategoryPayload: IUpdateCategoryPayload) {
    this.updateCategory(updateCategoryPayload);
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
