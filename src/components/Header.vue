<template>
  <header class="header">
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/"><p class="is-size-5 has-text-black">Qiita Stocker</p></a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <button class="button is-small">ボタン</button>
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
