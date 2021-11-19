import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index.js'
// 导入 router 实例对象
import router from '@/router/index.js'

const instance = axios.create({
  baseURL: 'http://www.liulongbin.top:8000/'
})

// 请求拦截器
// 注意：在我们的项目中，是基于 instance 实例来发起 ajax 请求的，因此一定要为 instance 实例绑定请求拦截器
instance.interceptors.request.use(
  config => {
    // 1. 获取 token 值
    const tokenStr = store.state.tokenInfo.token
    // 2. 判断 tokenStr 的值是否为空
    if (tokenStr) {
      // 3. 添加身份认证字段
      config.headers.Authorization = `Bearer ${tokenStr}`
    } else {
      console.log('token=null')
    }
    // 展示 loading 效果
    Toast.loading({
      message: '加载中...', // 文本内容
      duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器（注意：响应拦截器也应该绑定给 instance 实例）
instance.interceptors.response.use(
  response => {
    // 隐藏 loading 效果
    Toast.clear()
    return response
  },
  error => {
    // 隐藏 loading 效果
    Toast.clear()
    // 如果有响应的结果，并且响应的状态码是 401，则证明 Token 过期了
    if (error.response && error.response.status === 401) {
      // TODO1：清空 vuex 和 localStorage 中的数据
      // TODO2：强制跳转到登录页，并通过路由的 query 查询参数，把当前用户访问未遂的路由地址带给登录页
      console.log('token 过期啦')
      store.commit('clearState')
      // TODO2：强制跳转到登录页，并通过路由的 query 查询参数，把当前用户“访问未遂的路由地址”带给登录页
      router.replace('/login?pre=' + router.currentRoute.fullPath)
    }
    return Promise.reject(error)
  }
)
export default instance
