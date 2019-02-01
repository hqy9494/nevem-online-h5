import {
  fetchDrawSettings,
  fetchBook,
  fetchDraw
} from '../services/Draw'

export default {
  namespace: 'draw',
  state: {},
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      return history.listen(({
        pathname,
        query
      }) => {
        if (pathname.indexOf("buy") !== -1 || pathname.indexOf("orderCheck") !== -1) {
          dispatch({
            type: 'getDrawSettings'
          })
        }
      })
    }
  },
  effects: {
    * getDrawSettings({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(fetchDrawSettings)

      if (!data) return

      yield put({
        type: 'returnDrawSettings',
        payload: data
      })
    },
    * getDraw({
      payload
    }, {
      call,
      put,
      select
    }) {
      return yield call(fetchDraw)
    },
    * getBook({
      payload
    }, {
      call,
      put,
      select
    }) {
      return yield call(fetchBook, payload)
    },
  },
  reducers: {
    returnDrawSettings(state, action) {
      const {
        payload
      } = action;
      return {
        ...state,
        drawSettings: payload
      }
    }
  },
};
