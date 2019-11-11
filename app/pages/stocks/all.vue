<template>
  <section>
    <All />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import All from '@/components/pages/stocks/All.vue'
import { mapActions } from '@/store/qiita'

@Component({
  layout: 'stocks',
  components: {
    All
  },
  methods: {
    ...mapActions(['setIsLoadingAction'])
  }
})
export default class extends Vue {
  setIsLoadingAction!: (isLoading: boolean) => void

  async fetch({ store, error }: Context) {
    try {
      await store.dispatch('qiita/fetchUncategorizedStocks')
      await store.dispatch('qiita/saveDisplayCategoryId', 0)
    } catch (e) {
      error({
        statusCode: e.code,
        message: e.message
      })
    }
  }

  created() {
    // 一瞬「ストックされた記事はありません。」と表示されてしまうのを防ぐためcreated内でLoadingをoffにしている
    this.setIsLoadingAction(false)
  }
}
</script>
