import request from '../utils/request';

export function fetchAwards(params) {
  return request({
    url: "/drawRecords/my",
    method: "get",
    params
  })
}

export function fetchExpress(params) {
  return request({
    url: "/drawRecords/getLogisticsDetail",
    method: "get1",
    params
  })
}
export function fetchBooks(params) {
  return request({
    url: "/bookCards/getMy",
    method: "get",
    params
  })
}
export function fetchAddress(params) {
  return request({
    url: `/address/${params.id}`,
    method: "get"
  })
}
