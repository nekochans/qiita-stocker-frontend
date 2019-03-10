<template>
  <header class="header" id="pagination-scroll-top">
    <nav class="navbar navbar-guest">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" :to="{ name: 'home' }">
            <p class="is-size-4 has-text-black">Mindexer</p>
          </router-link>
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
              <router-link class="has-text-grey" :to="{ name: 'login' }"
                >ログイン</router-link
              >
            </div>
          </div>
          <div class="navbar-end" v-else>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">メニュー</a>
              <div class="navbar-dropdown is-right">
                <router-link class="navbar-item" :to="{ name: 'stocks' }"
                  >ストック一覧</router-link
                >
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
