export default {
  set: (key: string, value: any) => {
    window.localStorage.setItem(key, value);
  },
  get: (key: string): any => {
    return window.localStorage.getItem(key);
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  }
};
