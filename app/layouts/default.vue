<template>
  <section class="hero is-fullheight">
    <app-header />
    <nuxt />
    <app-footer />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

@Component({
  components: {
    AppHeader,
    AppFooter
  }
})
export default class extends Vue {}
</script>
