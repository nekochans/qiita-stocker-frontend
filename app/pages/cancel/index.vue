<template>
  <Cancel />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Cancel from '@/components/pages/cancel/Index.vue'

@Component({
  components: {
    Cancel
  }
})
export default class extends Vue {}
</script>
