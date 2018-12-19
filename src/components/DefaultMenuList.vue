<template>
  <section>
    <ul class="menu-list">
      <li><a class="is-active">全てのストック</a></li>
      <li><a>未分類</a></li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DefaultMenuList extends Vue {}
</script>
