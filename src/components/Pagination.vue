<template>
  <div>
    <ConfirmModal
      :isShow="showConfirmation"
      :message="confirmMessage"
      @confirmModal="confirmPaggination"
      @cancelModal="cancelPaggination"
    />
    <nav
      v-show="stocksLength && !isLoading"
      class="pagination"
      role="navigation"
    >
      <a
        class="pagination-previous"
        :disabled="!prevPage.page"
        @click="goToPage(prevPage);"
        >Previous</a
      >
      <a
        class="pagination-next"
        :disabled="!nextPage.page"
        @click="goToPage(nextPage);"
        >Next page</a
      >
      <ul class="pagination-list">
        <li>
          <a
            class="pagination-link"
            v-show="showFirstEllipsis()"
            @click="goToPage(firstPage);"
            >{{ firstPage.page }}</a
          >
        </li>
        <li>
          <span class="pagination-ellipsis" v-show="showPrevEllipsis()"
            >&hellip;</span
          >
        </li>
        <li>
          <a
            class="pagination-link"
            v-show="prevPage.page"
            @click="goToPage(prevPage);"
            >{{ prevPage.page }}</a
          >
        </li>
        <li>
          <a class="pagination-link is-current">{{ currentPage }}</a>
        </li>
        <li>
          <a
            class="pagination-link"
            v-show="nextPage.page"
            @click="goToPage(nextPage);"
            >{{ nextPage.page }}</a
          >
        </li>
        <li>
          <span class="pagination-ellipsis" v-show="showNestEllipsis()"
            >&hellip;</span
          >
        </li>
        <li>
          <a
            class="pagination-link"
            v-show="showLastPage()"
            @click="goToPage(lastPage);"
            >{{ lastPage.page }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IPage } from "@/domain/qiita";
import ConfirmModal from "@/components/ConfirmModal.vue";

@Component({
  components: {
    ConfirmModal
  }
})
export default class Pagination extends Vue {
  @Prop()
  isLoading!: boolean;

  @Prop()
  isCategorizing!: boolean;

  @Prop()
  stocksLength!: number;

  @Prop()
  currentPage!: number;

  @Prop()
  firstPage!: { page: number; perPage: number; relation: string };

  @Prop()
  prevPage!: { page: number; perPage: number; relation: string };

  @Prop()
  nextPage!: { page: number; perPage: number; relation: string };

  @Prop()
  lastPage!: { page: number; perPage: number; relation: string };

  targetPage!: IPage;
  showConfirmation: boolean = false;
  confirmMessage: string =
    "保存せずにページを遷移した場合、現在のストックの選択は解除されます。ページを移動してもよろしいですか？";

  showFirstEllipsis() {
    return this.firstPage.page !== this.prevPage.page;
  }

  showPrevEllipsis() {
    return this.firstPage.page + 1 < this.prevPage.page;
  }

  showNestEllipsis() {
    return this.nextPage.page + 1 < this.lastPage.page;
  }

  showLastPage() {
    return this.nextPage.page < this.lastPage.page;
  }

  goToPage(page: IPage) {
    this.targetPage = page;

    if (this.isCategorizing) return (this.showConfirmation = true);

    this.showConfirmation = this.isCategorizing;
    this.$emit("clickGoToPage", this.targetPage);
  }

  confirmPaggination(): void {
    this.showConfirmation = false;
    this.$emit("clickGoToPage", this.targetPage);
  }

  cancelPaggination(): void {
    this.showConfirmation = false;
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
