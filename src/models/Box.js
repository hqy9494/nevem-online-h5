import {
  fetchBox,
} from '../services/Box'

export default {
  namespace: 'box',
  state: {
    product: null,
    num: 1
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      return history.listen(({
        pathname,
        query
      }) => {
        if (pathname === "/") {
          dispatch({
            type: 'changeBox',
            payload: 1
          })
        }
        if (pathname === "/order" || pathname.indexOf("orderCheck") !== -1 || pathname.indexOf("express") !== -1 || pathname.indexOf("big") !== -1) {
          dispatch({
            type: 'getBox'
          })
        }
      })
    }
  },
  effects: {
    * getBox({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(fetchBox, 'get', {})

      if (!data) return

      yield put({
        type: 'returnBox',
        payload: data
      })
    },
  },
  reducers: {
    returnBox(state, action) {
      const {
        payload
      } = action;
      return {
        ...state,
        product: payload
      }
    },
    changeBox(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        num: payload
      }
    }
  },
};
