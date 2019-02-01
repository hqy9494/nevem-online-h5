const menu = [
	{
	  name: '盒子首页',
    path: 'indexHome',
	  // component: () => require('../routes/Index/IndexPage'),
	  // component: () => require('../routes/Index/Home'),
    component: () => require('../routes/Index/HomePage'),
	},
  {
    name: '主页',
    // component: () => require('../routes/Index/IndexPage'),
    // component: () => require('../routes/Index/HomePage'),
    component: () => require('../routes/Index/Home'),
    children: [
      {
        name: '盒子',
        path: 'buy/:id',
        component: () => require('../routes/Index/BoxPage')
      }
    ]
  },
  {
    name: '盒子首页动画',
    path: 'home',
    // component: () => require('../routes/Index/IndexAnimatePage')
    component: () => require('../routes/Index/IndexAnimatePage2')
  },
  {
    name: '微信客服关注页',
    path: 'customer',
    // component: () => require('../routes/Index/IndexAnimatePage')
    component: () => require('../routes/Index/CustomService')
  },
  {
    name: '登录',
    path: 'login',
    component: () => require('../routes/SignIn/SignInPage')
  },
  {
    name: '我的',
    path: 'my',
    component: () => require('../routes/Account/My')
  },
  {
    name: '选择地址',
    path: 'selectAddress',
    component: () => require('../routes/Address/SelectOrder')
  },
  {
    name: '选择抽奖地址',
    path: 'selectDrawAddress',
    component: () => require('../routes/Address/SelectDraw'),
    children: [
      {
        name: '关联地址成功',
        path: 'success',
        component: () => require('../routes/Address/DrawSuccess')
      }
    ]
  },
  {
    name: '中奖记录',
    path: 'award',
    component: () => require('../routes/Award/AwardPage'),
    children: [
      {
        name: '卡券中心',
        path: 'card',
        component: () => require('../routes/Award/CardPage')
      },
      {
        name: '大奖',
        path: 'big',
        component: () => require('../routes/Award/BigPage')
      },
      {
        name: '读书卡',
        path: 'book',
        component: () => require('../routes/Award/BookPage')
      },
      {
        name: '优惠券商城',
        path: 'store/:id',
        component: () => require('../routes/Award/StorePage')
      },
      {
        name: '商城详情',
        path: 'storeDetail/:id',
        component: () => require('../routes/Award/DetailPage')
      },
    ]
  },
  {
    name: '地址',
    path: 'address',
    component: () => require('../routes/Address/AddressList'),
    children: [
      {
        name: '地址详情',
        path: ':id',
        component: () => require('../routes/Address/AddressDetails')
      }
    ]
  },
  {
    name: '订单',
    path: 'order',
    component: () => require('../routes/Order/OrderList'),
    children: [
      // {
      //   name: '确认订单',
      //   path: 'check/:id',
      //   component: () => require('../routes/Order/OrderCheck')
      // },
      {
        name: '物流',
        path: 'express/:id',
        component: () => require('../routes/Order/Express')
      },
      {
        name: '状态',
        path: 'status',
        component: () => require('../routes/Order/Status')
      },
      {
        name: '成功',
        path: 'success',
        component: () => require('../routes/Order/OrderSuccess')
      }
    ]
  },
  {
    name: '确认订单',
    path: 'orderCheck',
    component: () => require('../routes/Order/OrderCheck')
  },
  {
    name: '抽奖',
    path: 'game',
    component: () => require('../routes/Game/LuckyDraw.js')
  },
  {
    name: '水晶',
    path: 'like',
    component: () => require('../routes/Like/Like.js'),
    children: [
      {
        name: '对战',
        path: 'fine',
        component: () => require('../routes/Like/LikeFine')
      },
      {
        name: '更多',
        path: 'more',
        component: () => require('../routes/Like/More')
      }
    ]
  },
  {
    name: '签到',
    path: 'CheckIn',
    component: () => require('../routes/CheckIn/CheckIn.js'),
    children: [
    	{
    		name: '翻倍',
    		path: 'double',
    		component: () => require('../routes/CheckIn/Double')
    	}
    ]
  },
  {
	  name: '翻牌活动',
    path: 'SelectCard',
    component: () => require('../routes/Select/SelectCard'),
  },
  {
	  name: '签到',
    path: 'Signins',
    component: () => require('../routes/Signins/Signins'),
	},
]

const formatter = (menu, parent, authority) => {
  let res = {}

  menu && menu.forEach(v => {
    // 处理合并路径
    const paths = `${parent ? `/${parent}` : ''}/${v.path || ''}`
    const item = Object.assign({}, v, {
      paths,
    })

    res[paths] = authority ? Object.assign(item, {
      authority: authority
    }) : item

    if (v.children && v.children.length > 0) {
      Object.assign(res, formatter(v.children, v.path, v.authority))
    }
  })

  return res
}

export default formatter(menu)
