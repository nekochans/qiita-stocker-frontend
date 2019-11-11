<template>
  <section>
    <StockCategories />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import StockCategories from '@/components/pages/stocks/categories/StockCategories.vue'
import { FetchCategorizedStockPayload, mapActions } from '@/store/qiita'

@Component({
  layout: 'stocks',
  components: {
    StockCategories
  },
  methods: {
    ...mapActions(['setIsLoadingAction'])
  }
})
export default class extends Vue {
  setIsLoadingAction!: (isLoading: boolean) => void

  async fetch({ store, error, route }: Context) {
    try {
      const id = route.params.id
      const categoryId: number = parseInt(id)
      const fetchCategorizedStockPayload: FetchCategorizedStockPayload = {
        categoryId,
        page: { page: 0, perPage: 0, relation: '' }
      }

      await store.dispatch(
        'qiita/fetchCategorizedStock',
        fetchCategorizedStockPayload
      )
      await store.dispatch('qiita/saveDisplayCategoryId', categoryId)
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
