<template>
  <Index />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Index from '@/components/pages/Index.vue'

@Component({
  components: {
    Index
  }
})
export default class extends Vue {}
</script>
