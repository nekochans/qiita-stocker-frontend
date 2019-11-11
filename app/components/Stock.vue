<template>
  <article class="media">
    <figure class="media-left">
      <a class="image is-48x48" :href="`https://qiita.com/${stock.userId}`">
        <img :src="stock.profileImageUrl" />
      </a>
    </figure>
    <div class="media-content content-no-scroll">
      <div class="content">
        <div class="item-info">
          <p>
            <a :href="`https://qiita.com/${stock.userId}`">{{ stock.userId }}</a
            >が{{ stock.articleCreatedAt }}に投稿しました
          </p>
        </div>
        <div class="item-title">
          <a
            :href="`https://qiita.com/${stock.userId}/items/${stock.articleId}`"
            >{{ stock.title }}</a
          >
        </div>
        <div class="tags tags-margin">
          <span v-for="(tag, key) in stock.tags" :key="key" class="tag">
            {{ tag }}
          </span>
        </div>
        <div v-if="stock.category" class="tags tags-margin">
          <span
            class="tag has-text-white has-background-primary category-margin"
          >
            {{ stock.category.name }}
          </span>
        </div>
      </div>
    </div>
    <label v-show="isCategorizing" class="checkbox checkbox-size">
      <input
        type="checkbox"
        :checked="stock.isChecked"
        class="checkbox-margin"
        @change="onClickCheckStock"
      />
    </label>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { UncategorizedStock } from '@/domain/domain'

@Component
export default class extends Vue {
  @Prop()
  stock!: UncategorizedStock

  @Prop()
  isCategorizing!: boolean

  onClickCheckStock() {
    this.$emit('clickCheckStock', this.stock)
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

.tags-margin {
  margin-bottom: 0;
}

.category-margin {
  margin-bottom: 0;
}

.checkbox-margin {
  margin-left: 0.3em;
}
</style>
