import request from '../utils/request';

export function LPSignUsersClick(params) {
  return request({
    url: "/LPSignUsers/click",
    method: "post",
    params
  })
}
