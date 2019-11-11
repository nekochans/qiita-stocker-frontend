<template>
  <Complete />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Complete from '@/components/pages/cancel/Complete.vue'

@Component({
  components: {
    Complete
  }
})
export default class extends Vue {}
</script>
