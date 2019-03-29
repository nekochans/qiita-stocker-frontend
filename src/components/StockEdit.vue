<template>
  <div
    v-show="stocksLength && !isLoading"
    :class="`${isCategorizing && 'stock-edit-sticky'}`"
  >
    <div class="navbar-menu edit-menu">
      <div class="navbar-end">
        <CategorizeButton
          :isCategorizing="isCategorizing"
          :isCancelingCategorization="isCancelingCategorization"
          :displayCategories="displayCategories"
          :checkedStockArticleIds="checkedStockArticleIds"
          @clickSetIsCategorizing="onSetIsCategorizing"
          @clickCategorize="onClickCategorize"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/domain/qiita";
import CategorizeButton from "@/components/CategorizeButton.vue";

@Component({
  components: {
    CategorizeButton
  }
})
export default class StockEdit extends Vue {
  @Prop()
  isLoading!: boolean;

  @Prop()
  stocksLength!: number;

  @Prop()
  isCategorizing!: boolean;

  @Prop()
  isCancelingCategorization!: boolean;

  @Prop()
  displayCategories!: ICategory[];

  @Prop()
  checkedStockArticleIds!: string[];

  onSetIsCategorizing() {
    this.$emit("clickSetIsCategorizing");
  }

  onClickCategorize(category: ICategory) {
    this.$emit("clickCategorize", category);
  }
}
</script>

<style scoped>
.edit-menu {
  display: block;
  box-shadow: none;
}

@media screen and (max-width: 768px) {
  .stock-edit-sticky {
    border-bottom: 1px solid #e8e8e8;
    display: block;
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>
