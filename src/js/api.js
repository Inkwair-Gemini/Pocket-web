import axios from 'axios';

// 创建一个 axios 实例，可以配置一些全局设置，比如 baseURL
const axiosInstance = axios.create({
  baseURL: 'http://api.misitetong.com/pocket',
  timeout: 10000, // 设置请求超时时间为 5 秒
  headers: {
    'Content-Type': 'application/json'
}
});

// 定义一个函数用于发送 POST 请求
export async function postData(endpoint, data) {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data; // 返回后端返回的数据
  } catch (error) {
    throw error; // 抛出错误，交由调用方处理
  }
}
// 定义一个函数用于发送 GET 请求
export async function getData(endpoint) {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data; // 返回后端返回的数据
    } catch (error) {
      throw error; // 抛出错误，交由调用方处理
    }
  }
  
  // 定义一个函数用于发送 PUT 请求（更新数据）
  export async function updateData(endpoint, newData) {
    try {
      const response = await axiosInstance.put(endpoint, newData);
      return response.data; // 返回后端返回的数据
    } catch (error) {
      throw error; // 抛出错误，交由调用方处理
    }
  }
  
  // 定义一个函数用于发送 DELETE 请求
  export async function deleteData(endpoint) {
    try {
      const response = await axiosInstance.delete(endpoint);
      return response.data; // 返回后端返回的数据
    } catch (error) {
      throw error; // 抛出错误，交由调用方处理
    }
  }