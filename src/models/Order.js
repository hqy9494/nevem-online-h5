import {
  fetchOrder,
  fetchOrderOne,
  createOrder,
  paySuccessCallback,
  fetchExpress
} from '../services/Order'
import {
  routerRedux
} from 'dva/router'

export default {
  namespace: 'order',
  state: {
    orderList: null
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
        if (pathname === '/order') {
          dispatch({
            type: 'getOrder'
          })
        }
      })
    }
  },
  effects: {
    * getOrder({
      payload
    }, {
      call,
      put,
      select
    }) {
      let params = {
        filter: {
          where: {
            status: {
              neq: "WAIT_PAY"
            }
          },
          order: 'createdAt desc'
        }
      }

      const data = yield call(fetchOrder, 'get1', params)

      if (!data) return

      yield put({
        type: 'returnOrder',
        payload: data
      })
    },
    * getOrderOne({
      payload
    }, {
      call,
      put,
      select
    }) {

      const data = yield call(fetchOrderOne, 'get', payload)

      if (!data) return

      yield put({
        type: 'returnOrderOne',
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
      const data = yield call(fetchExpress, 'get1', payload)

      if (!data) return

      yield put({
        type: 'returnExpress',
        payload: data
      })
    },
    * create({
      payload
    }, {
      call,
      put,
      select
    }) {
      return yield call(createOrder, 'post', payload)
    },
    * successCallback({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(paySuccessCallback, 'post', payload)

      if (!data) {
        return
      }
      yield put(routerRedux.push(`/order/success`))

    },
  },
  reducers: {
    returnOrder(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        orderList: payload
      }
    },
    returnOrderOne(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        orderOne: payload
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
    }
  },
};
