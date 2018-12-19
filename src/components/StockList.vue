<template>
  <div>
    <div v-if="stocks.length">
      <Stock
        v-if="stocks.length"
        v-for="stock in stocks"
        :stock="stock"
        :key="stock.id"
      />
    </div>
    <div v-else><h1 class="subtitle">ストックされた記事はありません。</h1></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Stock from "@/components/Stock.vue";
import { IStock } from "@/domain/qiita";

@Component({
  components: {
    Stock
  }
})
export default class StockList extends Vue {
  @Prop()
  stocks!: IStock[];
}
</script>
