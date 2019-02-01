import request from '../utils/request';

export function getBannerData() {
  return request({
    url: "/banners",
    method: "get"
  })
}

