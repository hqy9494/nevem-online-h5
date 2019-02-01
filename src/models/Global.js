export default {
  namespace: 'global',
  state: {},
  subscriptions: {
    setup({ history }) {
      return history.listen(({ pathname, search }) => {
        // 开发模式
        if (process.env.NODE_ENV !== 'production' || process.env.API_ENV !== 'prod') {
          // 手机调试
          if (window.eruda) window.eruda.init()
        }
      })
    }
  },
  effects: {},
  reducers: {},
}
