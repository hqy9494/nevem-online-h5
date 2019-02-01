import request from '../utils/request';

export function getCheckInGlobal() {
  return request({
    url: "/LPSignins/getSetting",
    method: "get"
  })
}

export function getCheckInInfo() {
	return request({
		url: "/LPSignins/getSignInfo",
		method: "get"
	})
}

export function getCheckInUser() {
	return request({
		url: "/LPSignUsers/getInfo",
		method: "get"
	})
}

export function postCheckIn(params) {
  return request({
    url: "/LPSignins/signin",
    method: "post",
    params
  })
}


export function postCheckShare(params) {
  return request({
    url: "/LPSignUsers/click",
    method: "post",
    params
  })
}