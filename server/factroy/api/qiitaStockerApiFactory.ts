import QiitaStockerApi from '../../repositories/qiitaStockerApi'
import { Api } from '../../domain/qiitaStockerApiInterface'

export default class QiitaStockerApiFactory {
  static create(): Api {
    return new QiitaStockerApi()
  }
}
