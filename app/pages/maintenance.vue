<template>
  <Maintenance :message="displayMessage" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Maintenance from '@/components/pages/Maintenance.vue'

@Component({
  components: {
    Maintenance
  }
})
export default class extends Vue {
  @Prop()
  message!: string

  displayMessage: string = ''

  created() {
    if (this.message) {
      this.displayMessage = this.message
    } else {
      this.displayMessage =
        '申し訳ありません。サービスは長期メンテナンス中です。'
    }
  }
}
</script>
