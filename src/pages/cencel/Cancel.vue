<template>
  <section class="hero is-fullheight">
    <AppHeader />
    <main>
      <div class="container has-text-centered">
        <h1 class="title">退会</h1>
        <button class="button is-danger" @click="cancel">退会する</button>
        <h2 class="is-size-6 cancel-guide">
          アカウントの情報が全て削除されます。<br />削除した情報を復元することはできません。
        </h2>
      </div>
    </main>
    <AppFooter />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const QiitaAction = namespace("QiitaModule", Action);

@Component({
  components: {
    AppHeader,
    AppFooter
  }
})
export default class Cancel extends Vue {
  @QiitaAction
  cancel!: () => void;
}
</script>

<style scoped>
.cancel-guide {
  padding-top: 1rem;
}
</style>
