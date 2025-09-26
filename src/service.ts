import Cookies, { Cookie, CookieSetOptions } from "universal-cookie";
const cookies = new Cookies();

class CookiesService {
  get(key: string) {
    return cookies.get(key);
  }
  set(key: string, value: Cookie, option?: CookieSetOptions) {
    return cookies.set(key, value, option);
  }
  remove(name: string) {
    return cookies.remove(name);
  }
}

export default new CookiesService();
