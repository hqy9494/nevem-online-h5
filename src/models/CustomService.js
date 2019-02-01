import { getBannerData } from '../services/CustomService'
export default {
  namespace: 'CustomService',
  state: {
    banner: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.toLowerCase() === '/customer') {
          dispatch({ type: 'getBanner'})
        }
      });
    }
  },
  effects: {
    *getBanner({ payload = {} }, { call, put, select }) {
      const data = yield call(getBannerData);
      let qrcode = {};
      if (!data) return
			for(let i in data){
				if(data[i].enable && data[i].name==="^_MyQRcode_$")
				qrcode = data[i];
			}

      yield put({
        type: 'qrcode',
        payload: {qrcode}
      })
    },
    
  },
  reducers: {
    qrcode(state, action){
      const {payload} = action
      return {
        ...state,
        banner: payload
      }
    }
  },
};
