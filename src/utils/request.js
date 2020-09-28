import axios from "axios";
import Config from "./config";
import { Message } from "element-ui";

let api = axios.create({
  baseURL: Config.baseUrl,
  timeout: 300000
});

// 添加请求拦截器
api.interceptors.request.use(
  config => {
    const userid = localStorage.getItem("userid") || "";
    if (userid) {
      config.headers["user"] = userid;
    }
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    if (error.response.status == "500" || error.response.status == "400") {
      Message.error({
        message: "服务器出差了"
      });
    }
    return Promise.reject(error);
  }
);

export const post = async (url, data) => {
  const response = await api.post(url, data).catch(error => {
    errorHandler(error);
  });
  return responseHandler(response);
};

export const get = async (url, data) => {
  const response = await api.get(url, data).catch(error => {
    errorHandler(error);
  });
  return responseHandler(response);
};
export const put = async (url, data) => {
  const response = await api.put(url, data).catch(error => {
    errorHandler(error);
  });
  return responseHandler(response);
};

export const del = async (url, data) => {
  const response = await api.request({ data, url, method: "DELETE" });
  return responseHandler(response);
};

//公共处理错误的方法
const responseHandler = response => {
  if (response && response.status == 200) {
    if (!response.data) {
      return {};
    }

    return response.data;
  }
  return null;
};

//公共处理返回体的方法
const errorHandler = error => {
  let errorMsg =
    (error.response && error.response.data && error.response.data.message) ||
    "服务器请求错误，请重试";
  Message.error(errorMsg);
  return errorMsg;
};
