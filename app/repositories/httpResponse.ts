import { Category } from '@/domain/domain'

type HttpStockResponse = {
  article_id: string
  title: string
  user_id: string
  profile_image_url: string
  article_created_at: string
  tags: string[]
}

export type HttpCategorizedStockResponse = HttpStockResponse & {
  id: number
}

export type HttpUncategorizedStockResponse = {
  stock: HttpStockResponse
  category?: Category
}
