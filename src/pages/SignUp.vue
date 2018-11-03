<template>
  <section class="hero is-fullheight">
    <header class="header">
      <div class="container">
        <nav class="navbar has-shadow">
          <div class="navbar-brand">
            <a class="navbar-item" href="http://localhost:8080">Qiita Stocker</a>
          </div>
        </nav>
      </div>
    </header>
    <main>
      <div class="container">
        <h1 class="title">アカウント作成</h1>
        <button class="button" @click="signUp">Qiitaアカウントで登録</button>
        <p v-show="permanentId">PermanentId :{{ permanentId }}</p>
      </div>
    </main>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Copyright (c) 2018 nekochans</p>
      </div>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

const QiitaAction = namespace("QiitaModule", Action);
const QiitaGetter = namespace("QiitaModule", Getter);

@Component
export default class SignUp extends Vue {
  @QiitaGetter
  permanentId!: string;

  @QiitaAction
  signUp!: () => void;
}
</script>
