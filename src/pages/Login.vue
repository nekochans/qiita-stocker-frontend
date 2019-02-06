<template>
  <section class="hero is-fullheight">
    <AppHeader />
    <main>
      <div class="container has-text-centered">
        <h1 class="title">ログイン</h1>
        <button class="button" @click="login">Qiitaアカウントでログイン</button>
        <h2 class="is-size-7 login-guide">
          アカウントを持っていない場合は<router-link :to="{ name: 'signup' }"
            >アカウント作成</router-link
          >から
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
