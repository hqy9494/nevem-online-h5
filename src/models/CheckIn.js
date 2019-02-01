
import {getCheckInGlobal, getCheckInInfo, getCheckInUser, postCheckIn, postCheckShare} from '../services/CheckIn'

export default {
  namespace: 'checkIn',
  state: {
    golbalData: {},
    checkInInfo: [],
    checkInUser: {},
    checkInAdd: {},  //包括今天的和补签的
    isCanToday: true, //今天是否可以签到 默认可以
    modalAdd: false,
    modalShare: false,
    modalShareFail: false,
    modalTodayOk: false,
    modalSuccess: false,
  },
  subscriptions: {
//  setup({dispatch, history}) {
//    return history.listen(({pathname, query}) => {
//         if (pathname === "/") {
////           dispatch({type: 'postCheckShare', payload: { date: query }})
//         }
//    })
//  }
  },
  effects: {
    *getCheckInGlobal({payload}, {call, put, select}) {
      const data = yield call(getCheckInGlobal)

      if (!data) return

      yield put({
        type: 'change',
        payload: {
          name: 'golbalData',
          value: data
        }
      })

      return data
    },

    *getCheckInInfo({payload}, {call, put, select}) {
      const info = yield call(getCheckInInfo)

      if(info[2].id){
        yield put({
          type: 'change',
          payload: {
            name: 'isCanToday',
            value: false
          }
        })
      }else{
        yield put({
          type: 'change',
          payload: {
            name: 'isCanToday',
            value: true
          }
        })
      }

      if(!info) return

      yield put({
        type: 'change',
        payload: {
          name: 'checkInInfo',
          value: info
        }
      })

      return info
    },

    *getCheckInUser({payload}, {call, put, select}) {
      const userinfo = yield call(getCheckInUser)

      if(!userinfo) return

      yield put({
        type: 'change',
        payload: {
          name: 'checkInUser',
          value: userinfo
        }
      })

      return userinfo
    },
    *postCheckIn({payload}, {call, put, select}) {
      if (!payload) return
      const data =  yield call(postCheckIn,  payload)

      yield put({
        type: 'change',
        payload: {
          name: 'checkInAdd',
          value: data
        }
      })

      return data;
    },
    *postCheckShare({payload}, {call, put, select}) {
      if (!payload) return
      const data =  yield call(postCheckShare,  payload)
      console.log(payload)
      yield put({
        type: 'change',
        payload: {
          name: 'userId',
          value: data
        }
      })

      return data;
    },
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
};
