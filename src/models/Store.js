import { getCouponsByValue } from '../services/TaobaoCoupon'
import pathToRegexp from 'path-to-regexp'

export default {
  namespace: 'store',
  state: {
    storeData: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const store = pathToRegexp('/award/store/:id').exec(pathname)
        if (store && store[0].includes('/store') && store[1]){
          dispatch({ type: 'getStore', payload: {value: store[1]}})
        }
      });
    }
  },
  effects: {
    *getStore({ payload = {} }, { call, put, select }) {
      if (!payload) return

      const data = yield call(getCouponsByValue, payload)

      if (!data) return

      return yield put({
        type: 'changeStore',
        payload: data
      })
    },
  },
  reducers: {
    changeStore(state, action){
      const { payload } = action

      return {
        ...state,
        storeData: payload
      }
    }
  },
};
