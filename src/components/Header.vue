<template>
  <header class="header">
    <div class="container">
      <nav class="navbar has-shadow">
        <div class="navbar-brand">
          <a class="navbar-item" href="http://localhost:8080"><p class="is-size-5 has-text-black">Qiita Stocker</p></a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <button class="button is-small">ボタン</button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>
