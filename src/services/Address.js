import request from '../utils/request';

export function fetchAddress(method = 'get', params = {}) {
  return request({
    url: `/address/my`,
    method,
    params
  })
}

export function fetchAddressOne(method = 'get', params = {}) {
  return request({
    url: `/address/${params.id}`,
    method
  })
}

export function createAddress(data) {
  return request({
    url: `/address/create/my`,
    method: 'post',
    params: {
      data
    }
  })
}

export function deleteAddress(data) {
  return request({
    url: `/address/${data.id}`,
    method: 'put',
    params: {
      enable: false
    }
  })
}

export function updateAddress(data) {
  return request({
    url: `/address/${data.id}`,
    method: 'put',
    params: data
  })
}
export function getWxAddressConfig(data) {
  return request({
    url: `/address/getWechatSDK`,
    method: 'get1',
    params: data
  })
}

export function concatDrawAddress(params) {
  return request({
    url: "/drawRecords/addAddress",
    method: 'post',
    params
  })
}