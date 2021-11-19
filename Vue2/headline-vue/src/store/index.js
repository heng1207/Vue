import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoAPI, getUserProfileAPI } from '@/api/userAPI.js'

Vue.use(Vuex)

// 初始的 state 对象
let initState = {
  // token 的信息对象
  tokenInfo: {},
  // 用户的基本信息
  userInfo: {},
  // 用户的简介信息
  userProfile: {}
}
const stateStr = localStorage.getItem('state')
if (stateStr) {
  console.log('加载本地的数据', JSON.parse(stateStr))
  // 加载本地的数据
  initState = JSON.parse(stateStr)
}
const store = new Vuex.Store({
  state: initState,
  mutations: {
    updateTokenInfo(state, val) {
      state.tokenInfo = val
      console.log(state)
      // 如果希望在 Mutation A 中调用 Mutation B，需要通过 this.commit() 方法来实现
      // this 表示当前的 new 出来的 store 实例对象
      // this.$store.commit()
      this.commit('saveStateToStorage')
    },
    // 将 state 持久化存储到本地
    saveStateToStorage(state) {
      localStorage.setItem('state', JSON.stringify(state))
    },
    clearState(state) {
      // 1. 清空 vuex 中的数据
      state.tokenInfo = {}
      state.userInfo = {}
      // 用户的简介信息
      state.userProfile = {}

      // 2. 将清空后的 state 存储到本地
      this.commit('saveStateToStorage')
    },
    // 更新 userInfo 的方法
    updateUserInfo(state, payload) {
      // 1. 把用户信息转存到 state 中
      state.userInfo = payload
      // 2. 将最新的 state 对象持久化存储到本地
      this.commit('saveStateToStorage')
    },
    // 更新 userProfile 的方法
    updateUserProfile(state, payload) {
      state.userProfile = payload
      this.commit('saveStateToStorage')
    }
  },
  actions: {
    // 初始化用户的基本信息
    async initUserInfo(ctx) {
      // 调用 API 接口
      const { data: res } = await getUserInfoAPI()
      if (res.message === 'OK') {
        // TODO：把数据转交给 Mutation 方法   ctx.commit('Mutation方法名')
        ctx.commit('updateUserInfo', res.data)
      }
    },
    // 初始化用户的简介信息
    async initUserProfile(ctx) {
      // 调用 API 接口
      const { data: res } = await getUserProfileAPI()
      if (res.message === 'OK') {
        ctx.commit('updateUserProfile', res.data)
      }
    }
  }
})

export default store
