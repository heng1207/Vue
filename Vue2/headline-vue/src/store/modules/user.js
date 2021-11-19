const userModule = {
  namespaced: true,
  state() {
    return {
      token: 'hahahaha'
    }
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    }
  },
  actions(state, val) {}
}

export default userModule
