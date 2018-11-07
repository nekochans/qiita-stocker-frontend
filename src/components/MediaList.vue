<template>
  <div>
    <div v-if="qiitaItems.length">
      <Media
        v-if="qiitaItems.length"
        v-for="qiitaItem in qiitaItems"
        :qiitaItem="qiitaItem"
        :key="qiitaItem.id"
      />
    </div>
    <div v-else>
      <h1 class="subtitle">ストックされた記事はありません。</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Media from "@/components/Media.vue";
import { IQiitaItem } from "@/domain/Qiita";

@Component({
  components: {
    Media
  }
})
export default class MediaList extends Vue {
  @Prop()
  qiitaItems!: IQiitaItem[];
}
</script>
