<template>
  <header class="header">
    <nav class="navbar navbar-guest">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/"
            ><p class="is-size-5 has-text-black">Qiita Stocker</p></a
          >
          <a
            role="button"
            class="navbar-burger"
            :class="{ 'is-active': isMenuActive }"
            @click="menuToggle();"
          >
            <span></span> <span></span> <span></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
          <div class="navbar-end" v-if="!isLoggedIn">
            <div class="navbar-item">
              <a href="/login" class="has-text-grey">ログイン</a>
            </div>
          </div>
          <div class="navbar-end" v-else>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">アカウント</a>
              <div class="navbar-dropdown is-right">
                <a class="navbar-item" href="/stocks/all">ストック一覧</a>
                <a class="navbar-item" @click="logout">ログアウト</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

const QiitaAction = namespace("QiitaModule", Action);
const QiitaGetter = namespace("QiitaModule", Getter);

@Component
export default class AppHeader extends Vue {
  @QiitaGetter
  isLoggedIn!: boolean;

  @QiitaAction
  logout!: () => void;

  isMenuActive: boolean = false;

  menuToggle() {
    this.isMenuActive = !this.isMenuActive;
  }
}
</script>

<style scoped>
.navbar-guest {
  border-top: 6px solid #00d1b2;
  border-bottom: 1px solid #e8e8e8;
}
</style>
