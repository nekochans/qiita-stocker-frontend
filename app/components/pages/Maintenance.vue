<template>
  <main>
    <div class="container has-text-centered">
      <h1 class="title">長期メンテナンス中です🐱</h1>
      <h2 class="subtitle">{{ message }}</h2>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop()
  message!: string
}
</script>

<style scoped>
.subtitle {
  padding-top: 1rem;
}
</style>
