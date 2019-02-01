import {
  Component
} from 'react';
import {
  connect
} from 'dva';
import {
  Button,
  WingBlank,
  WhiteSpace,
  Flex,
  List,
  InputItem
} from 'antd-mobile';
import {getUrlParams} from '../../utils/utils'

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  componentWillMount(){
    let params = getUrlParams();
    // console.log(window.location.href, 'href123123')

    this.params = params;
    if (params && params.openId) {
      localStorage.openId = params.openId
      this.props.dispatch({
        type: 'account/openidLogin',
        payload: {
          openId: params.openId
        }
      }).then((user) => {
        if(user && !params.to){
          this.props.history.replace(`/indexHome`)
        }else if (user) {
          // 集赞活动
          const url = params.to ? decodeURIComponent(params.to) : ''
          const urlParams = this.isJSON(url) ? JSON.parse(url) : url

          let param = {}

          if (urlParams['hostId']) param['hostId'] = urlParams['hostId']
          if (urlParams['teamId']) param['teamId'] = urlParams['teamId']

          // 签到活动：统计分享点击
          if (urlParams['from'] === 'checkin' && urlParams['userId']) {
            this.props.dispatch({
              type: 'account/LPSignUsersClick',
              payload: urlParams['userId']
            })
          }

          let str = this.combindUrlParam(param)

          if (urlParams && urlParams['url'] === '/me') {
            this.props.history.replace(`/my?openId=${this.params.openId}`)
          }else if(urlParams && urlParams['url'] === '/like'){
            this.props.dispatch({
              type: 'like/beforeCheckUser',
            }).then(v => {
              const {checkUser, teamData} = v
              // 判断是否组队成功（满4人）
              if (teamData.enable) {
                str = this.combindUrlParam(Object.assign({}, param, {
                  teamId: teamData.id
                }))
                this.props.history.replace(`/like/fine${str}`)
              } else{
                this.props.history.replace(`/like${str}`)
              }
            })
          }else if(urlParams && urlParams['url'] === '/'){
            this.props.history.replace(`/`)
          }else if(urlParams && urlParams['url'] === '/like/fine'){
            this.props.history.replace(`/like/fine${str}`)
          }else if(urlParams && urlParams['url'] === '/CheckIn'){
            this.props.history.replace(`/CheckIn`)
          }else if(urlParams && urlParams['url'] === '/indexHome'){
            this.props.history.replace(`/indexHome`)
          }else if(urlParams && urlParams['url'] === '/customer'){
            this.props.history.replace(`/customer${str}`)
          }else if(urlParams && urlParams['url'] === '/Signins'){
            this.props.history.replace(`/Signins${str}`)
          }else{
            this.props.history.push((this.params.to && this.params.to !== undefined) ? `/my?openId=${this.params.openId}` : '/indexHome')
          }
        }
      });
    }else if(params && params.token){
      this.props.dispatch({
        type: 'account/tokenLogin',
        payload: {id: params.token}
      }).then((me)=>{
        if(params.to==="address"){
          this.props.history.push(`/address`);
        }else if(params.to==="record"){
          this.props.history.push(`/award`);
        }else if(params.to==="my"){
          this.props.history.push(`/my`);
        }else if(params.to==="customer"){
          this.props.history.push(`/customer`);
        }
      })
    }
  }
  combindUrlParam = (obj) => {
    let str = ''
    for(let i of Object.keys(obj)){
      str += `&${i}=${obj[i]}`
    }

    str = str ? `?${str.slice(1)}` : ''

    return str
  }
  isJSON = (str) => {
    if (typeof str == 'string') {
      try {
        JSON.parse(str);
        return true;
      } catch(e) {
        console.log(e);
        return false;
      }
    }
    console.log('It is not a string!')
  }
  parseParameter(url) {
    if (!url) url = window.location.href;
    var reg_url = /^[^\?@]+\?([\w\W]+)$/,
      reg_para = /([^&=@]+)=([\w\W]*?)(&|$|#|@)/g,
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
  render() {
    return <div /> ;
  }
}

SignInPage.propTypes = {};

const mapStateToProps = state => {
  return {
    me: state.account.me
  };
};

export default connect(mapStateToProps)(SignInPage);
