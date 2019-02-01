// import {getSetting, getSignInfo,postSignin,getSignUser} from '../services/LPSignins'
import styles from "../routes/Select/SelectCard.scss"
import zero from "../assets/Img/signin/zero.png"
import three from "../assets/Img/signin/three.png"
import ten from "../assets/Img/signin/ten.png"
import fifty from "../assets/Img/signin/fifty.png"
export default {
  namespace: 'SelectCard',
  state: {
    modalPrize: false,
    openCards: true,   //卡牌背面能否点击
    flag: true,        //是否打乱顺序重新发牌
    current: 0,
    cards:  [
      {
        class:styles.card10,
        src: ten,
      },
      {
        class: styles.card20,
        src: zero,
      },
      {
        class: styles.card30,
        src: three,
      },
      {
        class: styles.card40,
        src: fifty,
      },
    ],
    iniCards: [
      {
        class: styles.card1,    //首个默认10倍3天
        src: ten,
      },
      {
        class: styles.card2,
        src: zero,
      },
      {
        class: styles.card3,
        src: three,
      },
      {
        class: styles.card4,
        src: fifty,
      },
    ],
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
