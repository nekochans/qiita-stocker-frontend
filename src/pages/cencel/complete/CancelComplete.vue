<template>
  <section class="hero is-fullheight">
    <AppHeader />
    <main>
      <div class="container has-text-centered">
        <h1 class="title">退会完了</h1>
        <h2 class="is-size-6">
          退会が完了しました。<br />
          ご利用いただき、ありがとうございました。<br />
          またのご利用をお待ちしております。
        </h2>
      </div>
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
export default class CancelComplete extends Vue {}
</script>
