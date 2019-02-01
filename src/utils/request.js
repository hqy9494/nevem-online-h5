// import fetch from 'dva/fetch';
import axios from 'axios';
import common from '../common/common'
axios.defaults.baseURL = common.baseURL

export default function request(params) {
  const allow = ['url', 'method']
  let request = {}

  for (let i of Object.keys(params)) {
    if (allow.includes(i)) {
      if (i === 'url') {
        // request[i] = `/api/v1${params[i]}`
        request[i] = `/api${params[i]}`
      } else {
        request[i] = params[i]
      }
    }
  }

  // 参数
  if (params.method === 'get') {
    request.params = {
      filter: params.params
    }
  } else if (params.method === 'get1') {
    request.method = "get"
    request.params = params.params
  } else {
    request.data = params.params
  }

  // token
  if (params.url !== '/accounts/login') {
    request = Object.assign(request, {
      headers: {
        Authorization: localStorage.token
      }
    })
  }

  return fetch(request)
}

export const fetch = request => {
  return axios(request)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      let error = err.response && err.response.data && err.response.data.error;

      if (!error) return

      throw {
        errCode: error.statusCode,
        errMsg: error.msg || error.message || "系统出错"
      } // eslint-disable-line
    })
}
