import { getCouponsById } from '../services/TaobaoCoupon'
import pathToRegexp from 'path-to-regexp'

export default {
  namespace: 'detail',
  state: {
    detail: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const store = pathToRegexp('/award/storeDetail/:id').exec(pathname)
        if (store && store[0].includes('/storeDetail') && store[1]){
          dispatch({ type: 'getDetail', payload: {id: store[1]}})
        }
      });
    }
  },
  effects: {
    *getDetail({ payload = {} }, { call, put, select }) {
      if (!payload) return

      const data = yield call(getCouponsById, payload)

      if (!data) return

      return yield put({
        type: 'changeDetail',
        payload: data
      })
    },
  },
  reducers: {
    changeDetail(state, action){
      const { payload } = action

      return {
        ...state,
        detail: payload
      }
    }
  },
};
