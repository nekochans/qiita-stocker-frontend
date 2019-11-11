<template>
  <main>
    <div class="container has-text-centered">
      <h1 class="title">退会</h1>
      <button class="button is-danger" @click="cancel">退会する</button>
      <h2 class="is-size-6 cancel-guide">
        アカウントの情報が全て削除されます。<br />削除した情報を復元することはできません。
      </h2>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapActions } from '@/store/qiita'

@Component({
  methods: {
    ...mapActions(['cancelAction'])
  }
})
export default class extends Vue {
  cancelAction!: () => void

  async cancel() {
    try {
      await this.cancelAction()
      this.$router.replace({ path: 'cancel/complete' })
    } catch (error) {
      return this.$nuxt.error({
        statusCode: error.code,
        message: error.message
      })
    }
  }
}
</script>

<style scoped>
.cancel-guide {
  padding-top: 1rem;
}
</style>
