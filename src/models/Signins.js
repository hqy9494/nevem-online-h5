import {getSetting, getSignInfo,postSignin,getSignUser,getCount,postShareId} from '../services/LPSignins'

export default {
    namespace: 'Signins',
    state: {
      modalSuccess: false,
      modalInfo: false,
      modalAdd: false,
      modalShare: false,
      modalClose: false,
      addSignIndex: 2,
      signArr: [],
      count: {times:0},
      magnify: 1,
      ifAdd: false,
      couldToday: false,
      crystal: 0,
    },
    subscriptions: {
      setup({dispatch, history}) {
        return history.listen(({pathname, query}) => {
          // if (pathname === "/like") {
          //   dispatch({type: 'checkUser'})
          // }
        })
      }
    },
    effects: {
      *getSetting({payload}, {call, put, select}) {
        const data = yield call(getSetting)
        // console.log(data,'settings')
        if (!data) return
        yield put({
          type: 'change',
          payload: {
            name: 'Setting',
            value: data
          }
        })
        return data
      },
      
      *getSignInfo({payload}, {call, put, select}) {
        const data = yield call(getSignInfo)
        // const magnify = data[2].magnify||1;
        // const checkToday = data[2].id?false:true;
        if (!data) return
        // console.log(data[2].id?false:true,'info')
        // console.log(data)
        yield put({
          type: 'change',
          payload: {
            name: 'signArr',
            value: data
          }
        })
        yield put({
          type: 'change',
          payload: {
            name: 'magnify',
            value: data[2].couldMagnify?data[2].magnify:1,
          }
        })
        yield put({
          type: 'change',
          payload: {
            name: 'couldToday',
            value: data[2].id?false:true,
          }
        })
        return data
      },
      
      *getSignUser({payload}, {call, put, select}) {
        const data = yield call(getSignUser)
        if (!data) return
        // console.log(data)
        yield put({
          type: 'change',
          payload: {
            name: 'count',
            value: {times:data.times}
          }
        })
        return data
      },

      *postSignin({payload}, {call,put,select}) {
        if (!payload) return
        return yield call(postSignin, {
          date: payload
        })
      },

      *postShareId({payload }, {call,put,select
      }) {
        if (!payload) return
        return yield call(postShareId, {
          userId: payload
        })
      }
    },

    reducers: {
      change(state, action) {
        const {payload} = action
  
        if (!payload || !payload.name) return
  
        return {
          ...state,
          [payload.name]: payload.value
        }
      }
    },
  }
  