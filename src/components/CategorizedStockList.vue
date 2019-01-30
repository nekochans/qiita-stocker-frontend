<template>
  <div v-show="!isLoading">
    <div v-if="stocks.length">
      <CategorizedStock
        v-if="stocks.length"
        v-for="stock in stocks"
        :stock="stock"
        :key="stock.id"
        :isCategorizing="isCategorizing"
        :isCancelingCategorizing="isCancelingCategorizing"
        @clickCheckStock="onClickCheckStock"
        @clickCancelCategorization="onClickCancelCategorization"
      />
    </div>
    <div v-else><h1 class="subtitle">ストックされた記事はありません。</h1></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CategorizedStock from "@/components/CategorizedStock.vue";
import { ICategorizedStock } from "@/domain/qiita";

@Component({
  components: {
    CategorizedStock
  }
})
export default class CategorizedStockList extends Vue {
  @Prop()
  stocks!: ICategorizedStock[];

  @Prop()
  isCategorizing!: boolean;

  @Prop()
  isCancelingCategorizing!: boolean;

  @Prop()
  isLoading!: boolean;

  onClickCheckStock(stock: ICategorizedStock) {
    this.$emit("clickCheckStock", stock);
  }

  onClickCancelCategorization(categorizedStockId: number) {
    this.$emit("clickCancelCategorization", categorizedStockId);
  }
}
</script>
