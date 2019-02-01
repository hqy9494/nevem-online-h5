import request from '../utils/request';

export function getMyTeam() {
  return request({
    url: "/LPTeams/getMyTeam",
    method: "get"
  })
}

export function getDetail(params) {
  return request({
    url: "/LPTeams/getDetail",
    method: "get1",
    params
  })
}

export function getYdayReward() {
  return request({
    url: "/LPTeams/getYdayReward",
    method: "get",
  })
}

export function postMakeTeam(params) {
  return request({
    url: "/LPTeams/makeTeam",
    method: "post",
    params
  })
}

export function getCheckUser(params) {
  return request({
    url: "/LPTeams/checkUser",
    method: "get",
    params
  })
}

export function postSupport(params) {
  return request({
    url: "/LPTeams/support",
    method: "post",
    params
  })
}
