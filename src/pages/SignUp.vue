<template>
  <section class="hero is-fullheight">
    <AppHeader />
    <main>
      <div class="container has-text-centered">
        <h1 class="title">アカウント作成</h1>
        <button class="button" @click="signUp">Qiitaアカウントで登録</button>
        <p v-show="permanentId">PermanentId :{{ permanentId }}</p>
      </div>
    </main>
    <AppFooter />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const QiitaAction = namespace("QiitaModule", Action);
const QiitaGetter = namespace("QiitaModule", Getter);

@Component({
  components: {
    AppHeader,
    AppFooter
  }
})
export default class SignUp extends Vue {
  @QiitaGetter
  permanentId!: string;

  @QiitaAction
  signUp!: () => void;
}
</script>
