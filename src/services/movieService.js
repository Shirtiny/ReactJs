import httpService from "./httpService";
import config from "../config/config.json";

const moviesUrl = config.apiUrl + "movies";

export async function getMovies() {
  const res = await httpService.get(moviesUrl);
  console.log("获取movies，响应：", res);
  return res.data;
}

export async function deleteMovie(id) {
  const res = await httpService.delete(moviesUrl + "/" + id);
  console.log("删除movie：", id, ";响应：", res);
  return res.data;
}
