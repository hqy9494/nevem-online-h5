import {
  fetchCrystal
} from '../services/Crystals'

export default {
  namespace: 'crystal',
  state: {},
  subscriptions: {},
  effects: {
    * getCrystal({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(fetchCrystal)

      if (!data) return

      yield put({
        type: 'returnDraw',
        payload: data
      })
    }
  },
  reducers: {
    returnDraw(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        number: payload
      }
    }
  },
};
