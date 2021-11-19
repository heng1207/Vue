import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/main/Main.vue'
import Home from '@/views/home/Home.vue'
import Mine from '@/views/mine/Mine.vue'
import Login from '@/views/login/Login.vue'
import Search from '@/views/search/Search.vue'
import SearchResult from '@/views/searchResult/SearchResult.vue'
// 导入文章详情组件
import ArticleDetail from '@/views/articleDetail/ArticleDetail.vue'
import UserEdit from '@/views/userEdit/UserEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      // path 为"空字符串"的子路由规则，叫做"默认子路由"
      { path: '', component: Home, name: 'home' },
      { path: '/mine', component: Mine }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  // name: 'search-result'
  { path: '/search/:kw', component: SearchResult, props: true },
  // 文章详情的路由规则
  {
    path: '/article/:id',
    component: ArticleDetail,
    name: 'art-detail',
    props: true
  },
  { path: '/user/edit', component: UserEdit, name: 'user-edit' }
]

const router = new VueRouter({
  routes
})

export default router
