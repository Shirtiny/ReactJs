import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

const successFunc = success => {
  console.log("拦截器反馈：请求成功，", success);
  return Promise.resolve(success);
};

const errorFunc = error => {
  console.log("拦截器反馈：请求失败，", error);
  const { response } = error;
  if (response && response.status >= 400 && response.status < 500) {
    console.log("这是一个可预期的错误，状态码：" + response.status);
  } else {
    toast.error("发生了一个意外的错误，状态码：" + response.status);
    logger.log(error);
  }
  return Promise.reject(error);
};

axios.interceptors.response.use(successFunc, errorFunc);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
