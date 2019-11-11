<template>
  <div>
    <section class="hero is-medium hero-top">
      <div class="hero-body hero-filter">
        <div class="container">
          <div class="columns">
            <div class="column is-7">
              <h1 class="title has-text-left has-text-white">
                <span class="description">Mindexerは、</span>
                <span class="description">Qiitaのストックに</span>
                <span class="description"
                  >カテゴリ機能を追加したサービスです。</span
                >
              </h1>
              <h2 class="subtitle has-text-left has-text-white">
                必要な情報をストックしておくだけでなく<br
                  class="break"
                />カテゴリに分類することによって、<br
                  class="break"
                />ほしい情報への素早いアクセス可能にします。
              </h2>
              <nuxt-link class="button is-medium is-primary" to="/signup"
                >今すぐ登録</nuxt-link
              >
            </div>
            <div class="column is-6"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">What can?</h1>
          <div class="columns">
            <div class="column is-offset-2 is-3 has-text-centered">
              <span class="icon">
                <i class="fas fa-folder-open fa-4x"></i>
              </span>
              <h2 class="title is-size-5 detail-title">ストックの取得</h2>
              <p class="has-text-left">
                Qiitaでストックした記事の一覧を取得します。
                一覧にカテゴリを表示し、記事がどのカテゴリに分類されているか一目で確認できます。
              </p>
            </div>
            <div class="column is-offset-2 is-3 has-text-centered">
              <span class="icon"> <i class="fas fa-list fa-4x"></i> </span>
              <h2 class="title is-size-5 detail-title">カテゴリの作成</h2>
              <p class="has-text-left">
                自分専用のカテゴリを作成することができます。
                記事をカテゴリに分けることで、ストックを管理しましょう。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {}
</script>

<style scoped>
.hero-top {
  background: black url(../../assets/top.jpg) 62% 50% / cover;
}

@media screen and (max-width: 1024px) {
  .hero-filter {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

@media screen and (max-width: 768px) {
  .hero-filter {
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.subtitle {
  padding-top: 1rem;
}

.detail-title {
  padding-top: 0.75rem;
}

.description {
  display: inline-block;
}

@media screen and (max-width: 480px) {
  .break {
    display: none;
  }
}
</style>
