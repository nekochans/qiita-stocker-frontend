import { IQiitaStockerSessionStorage } from "../../domain/qiita";
import LocalStorage from "@/infrastructure/repository/localStorage";

export default class LocalStorageFactory {
  static create(): IQiitaStockerSessionStorage {
    const localStorage = new LocalStorage();
    return localStorage;
  }
}
