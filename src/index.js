import dva from 'dva'
import createLoading from 'dva-loading'
import './index.css'
import { Toast } from 'antd-mobile'
import authorityList from './common/authority'

localStorage.debug = process.env.API_ENV === 'development'
// localStorage.debug = true

// 1. Initialize
const app = dva({
  onError(error, dispatch) {
    setTimeout(() => {
      Toast.info(`${error.errMsg}`)
    },1001)
  },
  onStateChange(state){
    const { loading, account } = state

    if (account.me && account.me.role && account.me.role.name) {
      const role = account.me.role.name
      if (!authorityList.includes(role)){
        Toast.info('该账号没有权限登录', 2)
        return
      }
    }

    if (loading.global) {
      Toast.loading('加载中...', 1)
    }else{
      Toast.hide()
    }
  }
})

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(require('./models/Global').default)

app.model(require('./models/Account').default)
app.model(require('./models/IndexAnimate').default)
app.model(require('./models/Address').default)
app.model(require('./models/Order').default)
app.model(require('./models/Home').default)
app.model(require('./models/CustomService').default)

app.model(require('./models/Box').default)
app.model(require('./models/Draw').default)
app.model(require('./models/Crystals').default)
app.model(require('./models/Award').default)
app.model(require('./models/Card').default)
app.model(require('./models/Store').default)
app.model(require('./models/Detail').default)

app.model(require('./models/Like').default)
app.model(require('./models/LikeFine').default)

app.model(require('./models/CheckIn').default)
app.model(require('./models/SelectCard').default)
app.model(require('./models/Signins').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
