<template>
  <section>
    <app-header />
    <nuxt />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppHeader from '@/components/AppHeader.vue'

@Component({
  components: {
    AppHeader
  }
})
export default class extends Vue {}
</script>
