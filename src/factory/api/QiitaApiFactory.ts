import QiitaApi from "../../infrastructure/api/qiitaApi";
import { IQiitaApi } from "@/domain/Qiita";

export default class QiitaApiFactory {
  static create(): IQiitaApi {
    const qiitaApi = new QiitaApi();
    return qiitaApi;
  }
}
