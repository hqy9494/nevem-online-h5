import request from '../utils/request';

export function getCoupons(params = {}) {
  return request({
    url: `/taobaocoupons`,
    params
  })
}

export function getCouponsByValue(params = {}) {
  return request({
    url: `/taobaocoupons/byValue`,
     method: 'get1',
    params
  })
}

export function getCouponsById(params = {}) {
  return request({
    url: `/taobaocoupons/${params.id}`,
    method: 'get1',
  })
}
