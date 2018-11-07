<template>
  <article class="media">
    <figure class="media-left">
      <a class="image is-48x48" :href="`https://qiita.com/${qiitaItem.userId}`" target="_blank">
        <img :src="qiitaItem.profile_image_url">
      </a>
    </figure>
    <div class="media-content">
      <div class="content">
        <div class="item-info">
          <p><a :href="`https://qiita.com/${qiitaItem.userId}`" target="_blank">{{ qiitaItem.userId }}</a>が{{ qiitaItem.created_at}}に投稿しました</p>
        </div>
        <div class="item-title">
          <a :href="`https://qiita.com/kobayashi-m42/items/${qiitaItem.id}`" target="_blank">{{ qiitaItem.title}}</a>
        </div>
        <div class="tags">
          <span
            v-for="(tag, key) in qiitaItem.tags"
            :key="key"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IQiitaItem } from "@/domain/Qiita";

@Component
export default class Media extends Vue {
  @Prop()
  qiitaItem!: IQiitaItem[];
}
</script>

<style scoped>
a {
  color: #337ab7;
}

a:hover {
  color: #23527c;
}

.media {
  font-size: 12px;
}

.item-info {
  font-size: 1em;
}
.item-title {
  margin-bottom: 0.3em;
  font-size: 1.4em;
}
</style>
