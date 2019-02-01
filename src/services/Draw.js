import request from '../utils/request';

export function fetchDrawSettings() {
  return request({
    url: "/drawSettings",
    method: "get"
  })
}

export function fetchDraw() {
  return request({
    url: "/drawRecords/draw",
    method: "post"
  })
}

export function fetchBook(params) {
  console.log(params);
  return request({
    url: "/bookCards/getCard",
    method: "get1",
    params
  })
}
