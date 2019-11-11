<template>
  <Error :message="message" />
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
  error!: { statusCode: string; message: string }

  message: string = ''

  created() {
    this.message = this.error.message
  }
}
</script>
