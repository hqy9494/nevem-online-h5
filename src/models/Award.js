import {
  fetchAwards,
  fetchExpress,
  fetchBooks,
  fetchAddress
} from '../services/Award'

export default {
  namespace: 'award',
  state: {},
  subscriptions: {},
  effects: {
    * getAward({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(fetchAwards, payload)

      if (!data) return

      yield put({
        type: 'returnAward',
        payload: data
      })
    },
    * getExpress({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(fetchExpress, payload)

      if (!data) return

      yield put({
        type: 'returnExpress',
        payload: data
      })

      const address = yield call(fetchAddress, {
        id: data.record.addressId
      })
      if (!address) return

      yield put({
        type: 'returnAddress',
        payload: address
      })
    },
    * getBooks({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(fetchBooks, payload)

      if (!data) return

      yield put({
        type: 'returnBooks',
        payload: data
      })
    }
  },
  reducers: {
    returnAward(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        awards: payload
      }
    },
    returnExpress(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        express: payload
      }
    },
    returnBooks(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        books: payload
      }
    },
    returnAddress(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        address: payload
      }
    },
  },
};
