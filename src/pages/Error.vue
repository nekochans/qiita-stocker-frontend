<template>
  <section class="hero is-fullheight">
    <header />
    <main class="container has-text-centered">
      <h1 class="title">Error</h1>
      <h2 class="subtitle">{{ errorMessage }}</h2>
      <a href="/">TOPページへ</a>
    </main>
    <AppFooter />
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import AppFooter from "@/components/AppFooter.vue";

@Component({
  components: {
    Header,
    AppFooter
  }
})
export default class Error extends Vue {
  @Prop()
  errorMessage!: string;
}
</script>

<style scoped>
.subtitle {
  padding-top: 1rem;
}
</style>
