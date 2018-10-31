<template>
  <div>
    <h1>404 Not Found</h1>
    <p>アクセスされたページが見つかりません。</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>
