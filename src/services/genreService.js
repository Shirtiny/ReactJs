import httpService from "./httpService";
import config from "../config/config.json";

const genresUrl = config.apiUrl + "genres";

export async function getGenres() {
  let genres = [];
  try {
    const res = await httpService.get(genresUrl);
    console.log("获取分类信息，响应：", res);
    genres = res.data;
  } catch (e) {
    console.log("获取genres，失败：", e);
  }
  return genres;
}

export async function getGenre(id) {
  let genre = {};
  const res = await httpService.get(genresUrl + "/" + id);
  genre = res.data;
  return genre;
}
