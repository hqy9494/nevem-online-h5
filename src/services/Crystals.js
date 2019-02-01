import request from '../utils/request';

export function fetchCrystal() {
  return request({
    url: "/crystals/my",
    method: "get"
  })
}
