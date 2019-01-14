<template>
  <section class="hero">
    <AppHeader />
    <main class="container">
      <div class="content"><h1>利用規約</h1></div>
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
export default class Terms extends Vue {}
</script>
