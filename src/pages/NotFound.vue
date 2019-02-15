<template>
  <section class="hero is-fullheight">
    <AppHeader />
    <main class="container has-text-centered">
      <h1 class="title">404 Not Found</h1>
      <h2 class="subtitle">アクセスされたページが見つかりません。</h2>
      <router-link :to="{ name: 'home' }">TOPページへ</router-link>
    </main>
    <AppFooter />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

@Component({
  components: {
    AppHeader,
    AppFooter
  }
})
export default class NotFound extends Vue {}
</script>

<style scoped>
.subtitle {
  padding-top: 1rem;
}
</style>
