import {getMyTeam, getDetail, postSupport, getYdayReward} from '../services/LPTeam'
import {getSetting} from '../services/LPSetting'

export default {
  namespace: 'likeFine',
  state: {
    teamData: {},
    againstTeam: {},
    YdayReward: {},
    hostId: '',
    teamId: '',
    isTime: false,
    crystalNum: 0,

    modalPkSuccess: false,
    modalMember: false,
    modalPkFail: false,
    // modalLike: false,
    modalTimeout: false,
    modalShare: false,
    modalCrystal: false,
    modalFindLike: false
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === "/like/fine" || pathname === "/like") {
          // dispatch({type: 'getYdayReward'})
          // dispatch({type: 'getMyTeam'})
        }
      })
    }
  },
  effects: {
    *getSetting({payload}, {call, put, select}){
      return yield call(getSetting)
    },
    *getYdayReward({payload}, {call, put, select}){
      const data = yield call(getYdayReward)

      if  (!data) return

      yield put({
        type: 'change',
        payload: {
          name: 'YdayReward',
          value: data
        }
      })

      return data
    },
    *support({payload}, {call, put, select}){
      const {hostId, teamId} = payload

      if  (!hostId || !teamId) return

      let data = {}

      try {
        data = yield call(postSupport, {hostId, teamId})
      }catch(e){
        console.log(e)
      }

      return data
    },
    *getMyTeam({payload}, {call, put, select}) {
      const data = yield call(getMyTeam)

      if (!data) return

      if  (data.againstTeamId) {
        yield put({type: 'getDetail', payload: {id: data.againstTeamId, name: 'againstTeam'}})
      }

      yield put({
        type: 'change',
        payload: {
          name: 'teamData',
          value: data
        }
      })

      return data
    },
    *getDetail({payload}, {call, put, select}) {
      if (!payload) return

      const {id, name} = payload

      if (!id) return

      const data = yield call(getDetail, {id})

      if (!data) return

      yield put({
        type: 'change',
        payload: {
          name,
          value: data
        }
      })

      return data
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
