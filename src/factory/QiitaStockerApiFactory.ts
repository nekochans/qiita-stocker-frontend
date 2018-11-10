import QiitaStockerApi from "@/infrastructure/api/qiitaStockerApi";
import { IQiitaStockerApi } from "@/domain/Qiita";

export default class QiitaStockerApiFactory {
  static create(): IQiitaStockerApi {
    const qiitaStockerApi = new QiitaStockerApi();
    return qiitaStockerApi;
  }
}
