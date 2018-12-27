<template>
  <div v-show="isLoading">ストック一覧を取得中...</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  @Prop()
  isLoading!: boolean;
}
</script>
