<template>
  <div>
    <HeaderGuest />
    <section class="hero is-medium hero-top">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6">
              <h1 class="title has-text-left has-text-white">Qiita Stockerは<br>Qiitaをストックするサービスです</h1>
              <h2 class="subtitle has-text-left has-text-white">説明文はあとで考える</h2>
              <a href="/signup" class="button is-medium is-primary">今すぐ登録</a>
            </div>
            <div class="column is-6">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">What can?</h1>
          <div class="columns">
            <div class="column is-4 has-text-centered">
              <img src="../assets/logo.png" width="70" height="70">
              <h2 class="title is-size-5">ストックの取得</h2>
              <p>ストックした記事の一覧を取得</p>
            </div>
            <div class="column is-4 has-text-centered">
              <img src="../assets/logo.png" width="70" height="70">
              <h2 class="title is-size-5">カテゴリの作成</h2>
              <p>カテゴライズすることで、記事を整理可能に</p>
            </div>
            <div class="column is-4 has-text-centered">
              <img src="../assets/logo.png" width="70" height="70">
              <h2 class="title is-size-5">検索機能</h2>
              <p>ストック内を検索して、記事に素早くアクセス</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderGuest from "@/components/HeaderGuest.vue";
import Footer from "@/components/Footer.vue";

@Component({
  components: {
    HeaderGuest,
    Footer
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.hero-top {
  background: black url(../assets/top.jpg) center / cover;
}
.subtitle {
  padding-top: 1rem;
}
</style>
