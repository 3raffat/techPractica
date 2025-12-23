import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookie = () => {
  return cookies.get("access_token");
};

export const setCookie = (value: string) => {
  cookies.set("access_token", value);
};

export const removeCookie = (name: string) => {
  cookies.remove(name, { path: "/" });
};
