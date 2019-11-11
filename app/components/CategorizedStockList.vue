<template>
  <div>
    <div v-if="stocks.length">
      <CategorizedStockItem
        v-for="stock in stocks"
        :key="stock.articleId"
        :stock="stock"
        :is-categorizing="isCategorizing"
        :is-canceling-categorization="isCancelingCategorization"
        @clickCheckStock="onClickCheckStock"
        @clickCancelCategorization="onClickCancelCategorization"
      />
    </div>
    <div v-else><h1 class="subtitle">ストックされた記事はありません。</h1></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CategorizedStockItem from '@/components/CategorizedStock.vue'
import { CategorizedStock } from '@/domain/domain'

@Component({
  components: {
    CategorizedStockItem
  }
})
export default class StockList extends Vue {
  @Prop()
  stocks!: CategorizedStock[]

  @Prop()
  isCategorizing!: boolean

  @Prop()
  isCancelingCategorization!: boolean

  onClickCheckStock(stock: any) {
    this.$emit('clickCheckStock', stock)
  }

  onClickCancelCategorization(categorizedStockId: number) {
    this.$emit('clickCancelCategorization', categorizedStockId)
  }
}
</script>
