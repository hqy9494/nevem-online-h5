import { getBannerData } from '../services/Home'
import a1 from '../assets/Img/a1.png';
export default {
  namespace: 'Home',
  state: {
    banner: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'getBanner'})
        }
      });
    }
  },
  effects: {
    *getBanner({ payload = {} }, { call, put, select }) {
      const data = yield call(getBannerData);
      let topBanner = [],unstartBanner = [],startBanner = [];
      if (!data) return
			for(let i in data){
				if(!data[i].enable)continue;
				if(data[i].isTop){
					if(!data[i].image){
						data[i].image = a1;
					}
					topBanner.push(data[i]);
				}else{
					let {startTime,endTime} = data[i];
					let nowTime = Date.parse(new Date());
					startTime = Date.parse(startTime);
					endTime = Date.parse(endTime);
					if(nowTime>endTime){
						continue;
					}else if(nowTime>=startTime && nowTime<=endTime){
						data[i].DTIME =	endTime - nowTime;
						startBanner.push(data[i]);
					}else if(nowTime<startTime){
						unstartBanner.push(data[i]);
					}
				}
			}

      yield put({
        type: 'topBanner',
        payload: {topBanner,unstartBanner,startBanner}
      })
    },
    
  },
  reducers: {
    topBanner(state, action){
      const {payload} = action
      return {
        ...state,
        banner: payload
      }
    }
  },
};
