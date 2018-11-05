<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-48x48 ">
        <img src="https://avatars3.githubusercontent.com/u/32682645?v=4">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <div class="item-info">
          <p>m42-kobayashiが2018/1/1に投稿しました</p>
        </div>
        <div class="item-title">
          <a href="https://qiita.com/kobayashi-m42/items/c0a2609ae61a72dcc60f">CORSについて理解してLaravel5.6で対応する</a>
        </div>
        <div class="tags">
          <span class="tag">CORS</span>
          <span class="tag">laravel5.6</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Media extends Vue {}
</script>

<style scoped>
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
