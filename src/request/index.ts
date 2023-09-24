import axios from 'axios';

// 创建axios示例
const service = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/42f3ef11a1e8ce672feee246f4d9d9f5/cms_1st/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

//请求拦截
/* 发送请求前，把请求拦截下来，获取请求中config的内容，修改完成后，返回config，让请求继续发送 */
service.interceptors.request.use((config) => {
  // 设置请求头设置
  config.headers = config.headers || {};
  // 尝试获取token
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || '';
  }
  return config;
});

// 响应拦截
service.interceptors.response.use(
  // 定义res函数
  (res) => {
    const code: number = res.data.code;
    if (code != 200) {
      return Promise.reject(res.data);
    }
    return res.data;
  },
  // 定义err函数
  (err) => {
    console.log(err);
  }
);

// 暴露service
export default service;
