<template>
  <div>
    <div v-if="stocks.length">
      <Media
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
import Media from "@/components/Media.vue";
import { IStock } from "@/domain/qiita";

@Component({
  components: {
    Media
  }
})
export default class MediaList extends Vue {
  @Prop()
  stocks!: IStock[];
}
</script>
