import { ILocalStorage } from "@/domain/Qiita";

export default class LocalStorage implements ILocalStorage {
  save(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }
  load(key: string): any {
    return window.localStorage.getItem(key);
  }
  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
