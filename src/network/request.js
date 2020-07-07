import axios from 'axios'

export function request(config) {
  // 插件axios实例对象
  const instance = axios.create({
    // baseURL: 'http://106.54.54.237:8000/api/v1',
    // baseURL: 'http://123.207.32.32:8000/api/v2',http://123.207.32.32:8000/api/m3
    baseURL: 'http://123.207.32.32:8000/api/m3',
    timeout: 5000
  })

  // 拦截器
  instance.interceptors.request.use(config => {
    return config //这里config其实就时拿到的数据
  }, err => {
    console.log(err)
  })
  instance.interceptors.response.use(res => {
    return res.data//这里需要res.data才能拿到数据
  }, err => {
    console.log(err)
  })
  // succes(res)

  // 发送真正的请求     
  return instance(config)
}


