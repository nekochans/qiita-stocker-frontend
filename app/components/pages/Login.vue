<template>
  <main>
    <div class="container has-text-centered">
      <h1 class="title">ログイン</h1>
      <a href="/oauth/request/login" class="button is-outlined">
        Qiitaアカウントでログイン
      </a>
      <h2 class="is-size-7 login-guide">
        アカウントを持っていない場合は<router-link :to="{ name: 'signup' }"
          >アカウント作成</router-link
        >から
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
.login-guide {
  padding-top: 1rem;
}
</style>
