<template>
  <section>
    <p class="menu-label">
      タグで検索
    </p>
    <div class="field">
      <input class="input" type="text" placeholder="ストック内を検索">
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-small">
          検索
        </button>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SideMenuSearch extends Vue {}
</script>
