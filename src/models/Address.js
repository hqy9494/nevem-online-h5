import {
  fetchAddress,
  fetchAddressOne,
  createAddress,
  deleteAddress,
  updateAddress,
  getWxAddressConfig,
  concatDrawAddress
} from '../services/Address'
import {
  routerRedux
} from 'dva/router'
import pathToRegexp from 'path-to-regexp'

export default {
  namespace: 'address',
  state: {
    addressDetails: null,
    selectedAddress: null,
    defaultAddressId: null
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
        if (pathname === '/selectAddress' || pathname === '/selectDrawAddress' || pathname.indexOf("orderCheck") !== -1) {
          dispatch({
            type: 'getAddress'
          })
        }
        if (/^\/address\/[^\/\?\&]+$/.test(pathname)) {
          const addressId = pathToRegexp('/address/:id').exec(pathname)[1];
          if (addressId !== "new") {
            dispatch({
              type: 'getAddressOne',
              payload: {
                id: addressId
              }
            })
          } else {
            dispatch({
              type: 'returnAddressOne',
              payload: null
            })
          }
        }
      })
    }
  },
  effects: {
    * getAddressOne({
      payload
    }, {
      call,
      put,
      select
    }) {
      const data = yield call(fetchAddressOne, 'get', {
        id: payload.id
      })

      if (!data) return

      yield put({
        type: 'returnAddressOne',
        payload: data
      })
    },
    * getAddress({
      payload
    }, {
      call,
      put,
      select
    }) {
      let params = {
        where: {
          enable: true
        },
        order: 'createdAt asc'
      }

      const data = yield call(fetchAddress, 'get', params)

      if (!data) return

      yield put({
        type: 'returnAddress',
        payload: data
      })
    },
    * setAddressDraw({
      payload
    }, {
      call,
      put,
      select
    }) {
      return yield call(concatDrawAddress, payload)
    },
    * create({
      payload
    }, {
      call,
      put,
      select
    }) {
      return yield call(createAddress, payload)
      // yield put(routerRedux.replace('/address'))
    },
    * delete({
      payload
    }, {
      call,
      put,
      select
    }) {
      return yield call(deleteAddress, payload)
      // yield put(routerRedux.replace('/address'))
    },
    * update({
      payload
    }, {
      call,
      put,
      select
    }) {
      yield call(updateAddress, payload)
      // yield put(routerRedux.replace('/address'))
    },
    * wxAddressConfig({
      payload
    }, {
      call,
      put,
      select
    }) {
      return yield call(getWxAddressConfig, payload)
      // yield put(routerRedux.replace('/address'))
    }
  },
  reducers: {
    setDefaultAddressId(state, action) {
      const {
        payload
      } = action;
      return {
        ...state,
        defaultAddressId: payload
      }
    },
    setAddress(state, action) {
      const {
        payload
      } = action;
      return {
        ...state,
        selectedAddress: payload
      }
    },
    returnAddress(state, action) {
      const {
        payload
      } = action;
      return {
        ...state,
        addressList: payload
      }
    },
    returnAddressOne(state, action) {
      const {
        payload
      } = action

      return {
        ...state,
        addressDetails: payload
      }
    },
  },
};
