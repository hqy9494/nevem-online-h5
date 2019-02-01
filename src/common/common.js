const env = (() => {
  const ENV = {
    baseURL: ''
  }

  switch (process.env.NODE_ENV) {
    case 'development':
      // ENV.baseURL = `https://nevem.yooyuu.com.cn`
      ENV.baseURL = `https://test.shop.lkd.yooyuu.com.cn`;
      ENV.baseEquipmentURL = `https://test.lkd.yooyuu.com.cn`;
      ENV.www = `www`;
      // ENV.baseEquipmentURL = `http://192.168.35.51:8080`;
      break
    default:
      // ENV.baseURL = `https://api.nevem.mrwish.net`
      ENV.baseURL = process.env.API_ENV === 'dev' ? `https://test.shop.lkd.yooyuu.com.cn` : `https://shop.lkd.yooyuu.com.cn`;
      ENV.baseEquipmentURL = process.env.API_ENV === 'dev' ? `https://test.lkd.yooyuu.com.cn` : `https://lkd.yooyuu.com.cn`;
      ENV.www = process.env.API_ENV === 'dev' ? `www` : `www8`;
      // ENV.baseEquipmentURL = `https://lkd.yooyuu.com.cn`;
			
      // ENV.baseURL = `https://test.shop.lkd.yooyuu.com.cn`;
      // ENV.baseEquipmentURL = `https://test.lkd.yooyuu.com.cn`;
      break
  }

  return ENV
})()

export default env
