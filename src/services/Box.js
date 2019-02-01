import request from '../utils/request';

export function fetchBox(method = 'get', params = {}) {
  return request({
    url: `/Products/single`,
    method,
    params
  })
}
