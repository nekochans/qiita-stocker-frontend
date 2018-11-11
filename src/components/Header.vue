<template>
  <header class="header">
    <nav class="navbar navbar-guest">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/"
            ><p class="is-size-5 has-text-black">Qiita Stocker</p></a
          >
        </div>
        <div class="navbar-menu is-active">
          <div class="navbar-end">
            <div class="navbar-item">
              <a href="/login" class="button">ログイン</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped>
.navbar-guest {
  border-top: 6px solid #00d1b2;
  border-bottom: 1px solid #e8e8e8;
}
</style>
