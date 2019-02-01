import {fetchDrawSettings} from '../services/Draw'

export default {
  namespace: 'indexAnimate',
  state: {
    boxNum: 12,
    box: [],
    setting: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/home') {
          dispatch({ type: 'initBox'})
          dispatch({ type: 'fetchDrawSettings'})
        }
      });
    }
  },
  effects: {
    *fetchDrawSettings({ payload = {} }, { call, put, select }) {
      const data = yield call(fetchDrawSettings)

      if (!data) return

      yield put({
        type: 'changeSetting',
        payload: data
      })
    },
  },
  reducers: {
    initBox(state, action) {
      const {boxNum} = state

      return {
        ...state,
        box: Array(boxNum).fill('').map((v, i) => {
          const number = i + 1
          const row = Math.floor(i / 3) + 1
          const col = i % 3 + 1

          return {
            title: `0${number}`.slice(-2),
            number,
            row,
            col,
            isDown: false
          }
        })
      }
    },
    changeBox(state, action){
      const {payload} = action
      const {box} = state

      return {
        ...state,
        box: box.map(v => {
          if (v.number === payload.number) {
            return payload
          }else{
            return v
          }
        })
      }
    },
    changeSetting(state, action){
      const {payload} = action

      return {
        ...state,
        setting: payload
      }
    }
  },
};
