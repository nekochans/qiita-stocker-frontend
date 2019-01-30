<template>
  <article class="media">
    <figure class="media-left">
      <a class="image is-48x48" :href="`https://qiita.com/${stock.user_id}`">
        <img :src="stock.profile_image_url" />
      </a>
    </figure>
    <div class="media-content content-no-scroll">
      <div class="content">
        <div class="item-info">
          <p>
            <a :href="`https://qiita.com/${stock.user_id}`">{{
              stock.user_id
            }}</a
            >が{{ stock.article_created_at }}に投稿しました
          </p>
        </div>
        <div class="item-title">
          <a
            :href="
              `https://qiita.com/${stock.user_id}/items/${stock.article_id}`
            "
            >{{ stock.title }}</a
          >
        </div>
        <div class="tags">
          <span v-for="(tag, key) in stock.tags" :key="key" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <label v-show="isCategorizing" class="checkbox checkbox-size">
      <input
        type="checkbox"
        :checked="stock.isChecked"
        @change="onClickCheckStock"
      />
    </label>
    <p
      v-show="!isCategorizing && isCancelingCategorizing"
      class="times-circle"
      @click="onClickCancelCategorization"
    >
      <span class="icon"> <i class="far fa-times-circle fa-2x"></i> </span>
    </p>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategorizedStock } from "@/domain/qiita";

@Component
export default class CategorizedStock extends Vue {
  @Prop()
  stock!: ICategorizedStock;

  @Prop()
  isCategorizing!: boolean;

  @Prop()
  isCancelingCategorizing!: boolean;

  onClickCheckStock() {
    this.$emit("clickCheckStock", this.stock);
  }

  onClickCancelCategorization() {
    this.$emit("clickCancelCategorization", this.stock.id);
  }
}
</script>

<style scoped>
.checkbox-size {
  zoom: 3;
}

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

.content-no-scroll {
  overflow-x: visible;
}

.times-circle {
  color: darkgray;
  float: right;
  transition: color 0.2s ease-out;
  padding: 0.5rem;
}

.times-circle:hover {
  color: gray;
}
</style>
