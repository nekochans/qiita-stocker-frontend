<template>
  <section class="hero is-fullheight">
    <Header />
    <main>
      <div class="container has-text-centered">
        <h1 class="title">ログイン</h1>
        <button class="button" @click="login">Qiitaアカウントでログイン</button>
        <h2 class="is-size-7 login-guide">
          アカウントを持っていない場合は<a href="/signup">アカウント作成</a>から
        </h2>
      </div>
    </main>
    <Footer />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const QiitaAction = namespace("QiitaModule", Action);

@Component({
  components: {
    Header,
    Footer
  }
})
export default class Login extends Vue {
  @QiitaAction
  login!: () => void;
}
</script>

<style scoped>
.login-guide {
  padding-top: 1rem;
}
</style>
