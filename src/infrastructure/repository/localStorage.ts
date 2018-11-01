export default {
  save: (key: string, value: any) => {
    window.localStorage.setItem(key, value);
  },
  load: (key: string): any => {
    return window.localStorage.getItem(key);
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  }
};
