import QiitaApi from "../../infrastructure/api/qiitaApi";
import { IQiitaApi } from "@/domain/qiita";

export default class QiitaApiFactory {
  static create(): IQiitaApi {
    const qiitaApi = new QiitaApi();
    return qiitaApi;
  }
}
