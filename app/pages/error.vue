<template>
  <Error :message="displayMessage" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Error from '@/components/pages/Error.vue'

@Component({
  components: {
    Error
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
        'エラーが発生しました。TOPページより再度行なってください。'
    }
  }
}
</script>
