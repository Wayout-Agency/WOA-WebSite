export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/admin`;
};

export const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};
