import request from '../utils/request';

export function fetchOrder(method = 'get', params = {}) {
  return request({
    url: `/orders/owner`,
    method,
    params
  })
}
export function fetchOrderOne(method = 'get', params = {}) {
  return request({
    url: `/orders/${params.id}`,
    method
  })
}
export function fetchExpress(method = 'get1', params = {}) {
  return request({
    url: `/orders/getLogisticsDetail`,
    method,
    params
  })
}
export function createOrder(method = 'post', params = {}) {
  return request({
    url: `/orders`,
    method,
    params
  })
}

export function paySuccessCallback(method = 'post', params = {}) {
  return request({
    url: `/orders/${params.id}/finishPay`,
    method,
    params: {
      orderId: params.id
    }
  })
}
