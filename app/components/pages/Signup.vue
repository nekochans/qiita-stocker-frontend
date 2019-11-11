<template>
  <main>
    <div class="container has-text-centered">
      <h1 class="title">アカウント作成</h1>
      <h2 class="is-size-7">
        下記を押した場合、
        <nuxt-link to="/terms">利用規約</nuxt-link> および
        <nuxt-link to="/privacy">プライバシーポリシー</nuxt-link>
        に同意したものとみなします。
      </h2>
      <a href="/oauth/request/signup" class="button is-outlined signup-margin">
        Qiitaアカウントで登録
      </a>
      <h2 class="is-size-7">
        ログインの方は<nuxt-link to="/login">こちら</nuxt-link>
      </h2>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {}
</script>

<style scoped>
.signup-margin {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
