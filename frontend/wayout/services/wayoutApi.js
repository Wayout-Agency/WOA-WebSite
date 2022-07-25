import axios from "redaxios";
import config from "config";
import { getSession } from "utils/tokens";

const wayoutAPI = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const rootWayoutAPI = async () => {
  return axios.create({
    baseURL: config.apiUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": `Bearer ${await getSession()}`,
    },
  });
};

export default wayoutAPI;
