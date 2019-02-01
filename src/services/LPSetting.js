import request from '../utils/request';

export function getSetting() {
  return request({
    url: "/LPSettings/getSetting",
    method: "get"
  })
}
