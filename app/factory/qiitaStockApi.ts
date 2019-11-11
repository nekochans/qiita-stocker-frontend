import Api from '@/repositories/api'
import { QiitaStockApi } from '@/domain/domain'

export default class QiitaStockApiFactory {
  static create(): QiitaStockApi {
    return new Api()
  }
}
