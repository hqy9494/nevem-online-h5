export function getUrlParams (url) {
  var uri = url || window.location.href
  var match = uri && uri.match(/([^?=&@]+)=([^?&@]+)/g)

  return match && match.reduce(function(a, b){
    var val = b.split(/([^?=&@]+)=([^?&@]+)/g)
    a[val[1]] = val[2]
    return a
  }, {}) || {}
}

export function parseParameter (url) {
  if (!url) url = window.location.href;
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1],
      result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
}

export function combindUrlParam (obj) {
  let str = ''
  for(let i of Object.keys(obj)){
    str += `&${i}=${obj[i]}`
  }

  str = str ? `?${str.slice(1)}` : ''

  return str
}
