import httpService from "./httpService";
import config from "../config/config.json";

const genresUrl = config.apiUrl + "genres";

export async function getGenres() {
  const res = await httpService.get(genresUrl);
  console.log("获取分类信息，响应：", res);
  return res.data;
}
