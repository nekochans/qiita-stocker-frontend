<template>
  <section class="hero is-fullheight">
    <Header />
    <main class="container has-text-centered">
      <h1 class="title">404 Not Found</h1>
      <h2 class="subtitle">
        アクセスされたページが見つかりません。
      </h2>
      <a href="/">TOPページへ</a>
    </main>
    <Footer />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

@Component({
  components: {
    Header,
    Footer
  }
})
export default class NotFound extends Vue {}
</script>

<style scoped>
.subtitle {
  padding-top: 1rem;
}
</style>
