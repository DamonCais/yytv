import axios from 'axios'
const service = axios.create({
    // baseURL: 'https://master-dev.guzzu.cn/suapi/2',
    baseURL: 'http://localhost:8081',
    timeout: 15000 // 请求超时时间
        // withCredentials: true

});



// request拦截器
service.interceptors.request.use(config => {
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default service;