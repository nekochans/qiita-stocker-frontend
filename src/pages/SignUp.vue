<template>
  <section class="hero is-fullheight">
    <AppHeader />
    <main>
      <div class="container has-text-centered">
        <h1 class="title">アカウント作成</h1>
        <h2 class="is-size-7">
          <input type="checkbox" :checked="isChecked" @change="onClickCheck" />
          私は、 <a href="/terms">利用規約</a> および
          <a href="/privacy">プライバシーポリシー</a> に同意します。
        </h2>
        <button
          class="button signup-margin"
          @click="signUp"
          :disabled="!isChecked"
        >
          Qiitaアカウントで登録
        </button>
        <h2 class="is-size-7">ログインの方は<a href="/login">こちら</a></h2>
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

@Component({
  components: {
    AppHeader,
    AppFooter
  }
})
export default class SignUp extends Vue {
  @QiitaAction
  signUp!: () => void;

  isChecked: boolean = false;

  onClickCheck() {
    this.isChecked = !this.isChecked;
  }
}
</script>

<style scoped>
.signup-margin {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
