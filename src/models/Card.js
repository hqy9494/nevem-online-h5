import { getCoupons } from '../services/TaobaoCoupon'

export default {
  namespace: 'card',
  state: {
    cardData: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/award/card') {
          dispatch({ type: 'getCard'})
        }
      });
    }
  },
  effects: {
    *getCard({ payload = {} }, { call, put, select }) {
      const data = yield call(getCoupons)

      if (!data) return

      return yield put({
        type: 'changeCard',
        payload: data
      })
    },
  },
  reducers: {
    changeCard(state, action){
      const { payload } = action

      return {
        ...state,
        cardData: payload
      }
    }
  },
};
