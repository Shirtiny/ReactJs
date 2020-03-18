import httpService from "./httpService";
import config from "../config/config.json";
import { toast } from "react-toastify";

const moviesUrl = config.apiUrl + "movies";

export async function getMovies() {
  let movies = [];
  try {
    const res = await httpService.get(moviesUrl);
    console.log("获取movies，响应：", res);
    movies = res.data;
  } catch (e) {
    console.log("获取movies，失败：", e);
    toast.info("获取movies，失败");
  }
  return movies;
}

export async function deleteMovie(id) {
  let deletedMovie = {};
  try {
    const res = await httpService.delete(moviesUrl + "/" + id);
    console.log("删除movie：", id, ";响应：", res);
    deletedMovie = res.data;
  } catch (e) {
    console.log("删除movie，失败：", e);
    throw e;
  }
  return deletedMovie;
}

export async function getMovie(id) {
  let movie = {};
  try {
    const res = await httpService.get(moviesUrl + "/" + id);
    console.log("查询一个movie：", id, "；响应：", res);
    movie = res.data;
  } catch (e) {
    console.log("查询一个movie，失败：", e);
    throw e;
  }
  return movie;
}

export async function saveMovie(movie) {
  if (movie._id) {
    let body = { ...movie };
    delete body._id;
    delete body.liked;
    console.log("put到服务器", body);
    return await httpService.put(moviesUrl + "/" + movie._id, body);
  } else {
    delete movie.liked;
    return await httpService.post(moviesUrl, movie);
  }
}
