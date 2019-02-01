import { login, wechatLogin, getMe,openIdGetMe, getWeixinConfig,fetchEquipmentToken } from '../services/Account'
import {getWxAddressConfig} from '../services/Address'
import {LPSignUsersClick} from '../services/LPSignUser'

export default {
  namespace: 'account',
  state: {
    token: '',
    me: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // 百度埋点
        if (window._hmt && history.location && history.location.pathname) {
          window._hmt && window._hmt.push(['_trackPageview', '/#' + history.location.pathname])
        }

        if (pathname === '/login') {
          // dispatch({ type: 'weixinConfig'})
        }
        if(pathname === '/my'){
          // dispatch({
          //   type: 'getMe'
          // })
        }
      });
    }
  },
  effects: {
    *openidLogin({ payload = {} }, { call, put, select }) {
      // 登陆
      const {id} = yield call(wechatLogin, payload)

      if (id) {
        localStorage.token = id
        yield put({
          type: 'setToken',
          payload: id
        })
      }

      // 获取系统自己的个人信息
      const meByOur = yield call(getMe)
      if (meByOur) localStorage.meByOur = JSON.stringify(meByOur)
      yield put({ type: 'weixinConfig'})

      // 获取微信个人信息
      return yield put({
        type: 'openIdGetMe',
        payload
      })
    },
    *tokenLogin({ payload = {} }, { call, put, select }) {

      if (payload.id) {
        localStorage.token = payload.id
        yield put({
          type: 'setToken',
          payload: payload.id
        })
      }

      // 获取个人信息
      return yield put({
        type: 'getMe'
      })
    },
    *login({ payload = {} }, { call, put, select }) {
      // 登陆
      const {id} = yield call(login, payload)

      if (id) {
        localStorage.token = id
        yield put({
          type: 'setToken',
          payload: id
        })
      }

      // 获取个人信息
      return yield put({
        type: 'getMe',
      })
    },
    *weixinConfig({ payload = {} }, { call, put, select }){
      const host = window.location.href.split('#')[0]
      const wx = window.wx
      const data = yield call(getWxAddressConfig, {url: host})

      const config = Object.assign(data, {
        jsApiList: ['scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem']
      })
      // console.log(config)
      wx.config(config)
    },
    *getEquipmentToken({ payload = {} }, { call, put, select }){
      return yield call(fetchEquipmentToken)
    },
    *getMe({ payload = {} }, { call, put, select }){
      const me = yield call(getMe)
      if (me) {
        localStorage.me = JSON.stringify(me)
        yield put({
          type: 'setMe',
          payload: me
        })
        return me
      }else{
        return false
      }
    },
    *openIdGetMe({ payload = {} }, { call, put, select }){
      const me = yield call(openIdGetMe,'get1',payload)

      if (me) {
        localStorage.me = JSON.stringify(me)
        yield put({
          type: 'setMe',
          payload: me
        })

        return me
      }else{
        return false
      }
    },
    *LPSignUsersClick({ payload = {} }, { call, put, select }){
      if (!payload) return

      yield call(LPSignUsersClick, {userId: payload})
    }
  },
  reducers: {
    setToken(state, action){
      const { payload } = action
      return {
        ...state,
        token: payload
      }
    },
    setMe(state, action){
      const { payload } = action
      return {
        ...state,
        me: payload
      }
    },
    getUser(state, action){
      const { payload } = action

      return {
        ...state,
        user: payload
      }
    }
  },
};
