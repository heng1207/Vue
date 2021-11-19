import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
import Vant, { Lazyload, Notify } from 'vant'
// 引入全部样式
import 'vant/lib/index.less'
// amfe-flexible
import 'amfe-flexible'
// 导入 dayjs 的核心模块
import dayjs from 'dayjs'

// 导入计算相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 导入中文语言包
import zh from 'dayjs/locale/zh-cn'

//  全局注册
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(Notify)

// 配置“计算相对时间”的插件
dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale(zh)

// dt 参数是文章的发表时间
Vue.filter('dateFormat', dt => {
  // 调用 dayjs() 得到的是当前的时间
  // .to() 方法的返回值，是计算出来的“相对时间”
  return dayjs().to(dt)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
