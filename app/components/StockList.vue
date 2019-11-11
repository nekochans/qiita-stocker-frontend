<template>
  <div>
    <div v-if="stocks.length">
      <Stock
        v-for="stock in stocks"
        :key="stock.articleId"
        :stock="stock"
        :is-categorizing="isCategorizing"
        @clickCheckStock="onClickCheckStock"
      />
    </div>
    <div v-else><h1 class="subtitle">ストックされた記事はありません。</h1></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Stock from '@/components/Stock.vue'
import { UncategorizedStock } from '@/domain/domain'

@Component({
  components: {
    Stock
  }
})
export default class StockList extends Vue {
  @Prop()
  stocks!: UncategorizedStock[]

  @Prop()
  isCategorizing!: boolean

  onClickCheckStock(stock: any) {
    this.$emit('clickCheckStock', stock)
  }
}
</script>
