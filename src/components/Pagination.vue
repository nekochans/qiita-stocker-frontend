<template>
  <nav v-show="stocksLength && !isLoading" class="pagination" role="navigation">
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IPage } from "@/domain/qiita";

@Component
export default class Pagination extends Vue {
  @Prop()
  isLoading!: boolean;

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
    this.$emit("clickGoToPage", page);
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 2rem;
}
</style>
