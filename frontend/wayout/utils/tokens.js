import { setCookie, getCookie } from "./cookies";
import wayoutAPI from "services/wayoutApi";

export const setTokens = ({ access, refresh, expire }) => {
  document.cookie = "";
  setCookie("expire", expire);
  setCookie("session", access);
  localStorage.setItem("refresh", refresh);
};

const checkExpire = (expire) => {
  return Date.now() / 1000 < expire;
};

const updateToken = async (refresh) => {
  await wayoutAPI
    .post("/token/refresh/", { value: refresh })
    .then((response) => {
      setTokens(response.data);
    })
    .catch((_) => {
      throw "Refresh token isn't valid";
    });
};

export const getSession = async () => {
  let expire = getCookie("expire");
  let session = getCookie("session");
  let refresh = localStorage.getItem("refresh");
  if (expire && session && checkExpire(expire)) {
    return session;
  }
  if (refresh) {
    await updateToken(refresh);
    return getCookie("session");
  }
};
