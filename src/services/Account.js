import request from '../utils/request'
import common from '../common/common'

export function login(params) {
  return request({
    url: `/accounts/login`,
    method: 'post',
    params
  })
}

export function wechatLogin(params) {
  return request({
    url: `/accounts/loginOrCreateByOpenId`,
    method: 'post',
    params
  })
}

export function getMe() {
  return request({
    url: `/accounts/me`,
    method: 'get',
  })
}

export function openIdGetMe(method, params) {
  return request({
    url: `/accounts/getWechatInfo`,
    method,
    params
  })
}

export function bindWeixin(params) {
  return request({
    url: `/accounts/reset/bind`,
    method: 'post',
    params
  })
}

export function getWeixinConfig(params) {
  return fetch({
    url: `/address/wxAddressConfig`,
    method: 'get',
  })
}

export function fetchEquipmentToken() {
  return request({
    url: `/accounts/getDrawToken`,
    method: 'get',
  })
}
