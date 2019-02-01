import {getMyTeam, postMakeTeam, getCheckUser} from '../services/LPTeam'

export default {
  namespace: 'like',
  state: {
    teamData: {},
    hostId: '',
    checkUser: '',
    modalSuccess: false,
    modalInfo: false,
    modalFindTeam: false,
    modalMember: false
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
    *beforeCheckUser({payload}, {call, put, select, all}){
      const [checkUser, teamData]  = yield all([
        call(getCheckUser),
        call(getMyTeam)
      ])

      yield put({
        type: 'change',
        payload: {
          name: 'checkUser',
          value: checkUser
        }
      })

      yield put({
        type: 'change',
        payload: {
          name: 'teamData',
          value: teamData
        }
      })

      return {
        checkUser,
        teamData
      }
    },
    *afterCheckUser({payload}, {call, put, select}) {
      const {hostId, checkUser} = payload
      const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
      let isTeam = false
      // 没有战队、可以加入、不是自己
      if (!checkUser.hasTeam && checkUser.joinAble && hostId && hostId !== 'undefined' && (hostId !== meByOur.id)){
        isTeam = yield put({type: 'postMakeTeam', payload: hostId})
      }

      yield put({
        type: 'change',
        payload: {
          name: 'hostId',
          value: hostId
        }
      })

      return isTeam
    },
    *getCheckUser({payload}, {call, put, select}){
      const checkUser = yield call(getCheckUser)

      if (!checkUser) return

      yield put({
        type: 'change',
        payload: {
          name: 'checkUser',
          value: checkUser
        }
      })
    },
    *getMyTeam({payload}, {call, put, select}) {
      const data = yield call(getMyTeam)

      if (!data) return

      yield put({
        type: 'change',
        payload: {
          name: 'teamData',
          value: data
        }
      })

      return data
    },
    *postMakeTeam({payload}, {call, put, select}) {
      if (!payload) return

      // yield put({
      //   type: 'change',
      //   payload: {
      //     name: 'hostId',
      //     value: payload
      //   }
      // })

      return yield call(postMakeTeam, {hostId: payload})
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
