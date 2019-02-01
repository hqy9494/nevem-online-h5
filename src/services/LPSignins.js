import request from '../utils/request';

export function getSetting() {
  return request({
    url: "/LPSignins/getSetting",
    method: "get"
  })
}

export function getSignInfo() {
  return request({
    url: "/LPSignins/getSignInfo",
    method: "get"
  })
}

export function postSignin(params) {
  return request({
    url: "/LPSignins/signin",
    method: "post",
    params
  })
}


export function getSignUser() {
  return request({
    url: "/LPSignUsers/getInfo",
    method: "get"
  })
}

export function getCount() {
  return request({
    url: "/LPSignins/count",
    method: "get"
  })
}

export function postShareId(params) {
  return request({
    url: "/LPSignUsers/click",
    method: "post",
    params
  })
}