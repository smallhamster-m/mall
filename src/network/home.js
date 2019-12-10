/* 
  home.js文件专门用于处理 home首页的数据请求。 
*/
import { request } from './request'

// 首页的某一个请求
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page,) {
  return request({
    url: '/home/data',
    params: {
      type, 
      page
    }
  })
}

