<template>
  <section class="side-menu-list">
    <p class="menu-label">
      カテゴリ一覧
    </p>
    <ul class="menu-list">
      <li><a class="is-active">未分類</a></li>
      <li><a>設計</a></li>
      <li><a>テスト</a></li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SideMenuList extends Vue {}
</script>

<style scoped>
.side-menu-list {
  margin-top: 1em;
}
</style>
