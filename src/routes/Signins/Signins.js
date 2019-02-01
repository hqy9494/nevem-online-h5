import { Component } from "react"
import { connect } from "dva"
import styles from "./signins.scss"
import bgimg from "../../assets/Img/signin/bgImg.png"
import Share from "../../assets/Img/signin/ShareCheckIn.png"
import checkInAdd from "../../assets/Img/signin/checkInAdd.png"
import signbtn from "../../assets/Img/signin/button.png"
import success from "../../assets/Img/signin/checkInSuccess2.png"
import add from "../../assets/Img/signin/checkInSuccess.png"
import signed from "../../assets/Img/signin/checkIn_active.png"
import unsign from "../../assets/Img/signin/checkIn_disable.png"
import close from "../../assets/Img/signin/close.png"
import today from "../../assets/Img/signin/checkIn_yes.png"
import addSignin from "../../assets/Img/signin/resignin.png"//补签气泡
import modify from "../../assets/Img/signin/modify.png"
import BuyBox from "../../assets/Img/signin/BuyBox.png"
import nextdays from "../../assets/Img/signin/checkIn_diamond.png"
import common from '../../common/common'
import { Modal } from 'antd-mobile';

import {parseParameter} from '../../utils/utils'
import shareimg from '../../assets/Img/crystal/sharewximg.png'
import moment from 'moment'
const alert = Modal.alert;
class SelectCard extends Component {
  state = {}
  componentWillMount(){
    // console.log(this.props)
    let params = parseParameter();
    // console.log(params)
    this.props.dispatch({type: 'Signins/getSetting'})
    .then((v={})=>{
      if(!v.enable){
        this.handleModal("modalClose",true)
      }else{
        this.props.dispatch({type: 'Signins/getSignInfo'})
        this.props.dispatch({type: 'Signins/getSignUser'})
      }
    })
  }

  
  SignToday=(date,signArr,times)=> {   //今日签到
    if(this.props.couldToday){
      this.props.dispatch({
        type: 'Signins/postSignin',
        payload: date,
      })
      .then((v={})=>{
        console.log(v,'response')
        let newArr=signArr;
        newArr[2].id = date;
        this.handleModal('crystal',v.crystal)
        this.handleModal('count',{times: times-0+1})
        this.handleModal('signArr',newArr)
        this.handleModal('modalSuccess', true)
      })
    }
    else{
      alert('今天签过啦 (づ￣3￣)づ╭❤')
    }
  }
  addSignin=(date,signArr,index)=> {   //补签
    if(!signArr[index].id){
      this.handleModal('modalInfo', true);
      this.handleModal('addSignIndex',index);
    }
    else{
      alert('签一次就好 ~(＾◇^)/')
    }
  }

  handleWillShare=()=>{       //弹出分享提示
    this.handleModal('modalInfo',false)
    this.handleModal('modalShare', true)
    this.handleModal('ifAdd',true);       //区分分享前是否点击了补签
  }

  handleNotShare=()=>{       //取消补签
    this.handleModal('modalInfo', false);
    this.handleModal('ifAdd',false);
  }

  handleShareCancel=(that)=>{    //取消分享或分享失败
    alert('亲，你没分享成功哦~~', '', [
      { text: '我知道了', onPress: () => {
        console.log('cancel'); 
        that.handleModal('modalShare',false);
        that.handleModal('ifAdd',false);     
      } },
      {
        text: '马上分享',
        onPress: () =>{
          that.handleModal('modalShare', true);
          that.handleModal('ifAdd',true);
        }
      },
    ])

    // that.handleShareSuccess(that);
  }

  handleShareSuccess=(that)=>{     //分享成功
    that.handleModal('modalShare', false);
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    const me = localStorage.me ? JSON.parse(localStorage.me) : {}
    // console.log(meByOur.id||me.id)
    if(that.props.ifAdd){           //判断是否有补签动作
      let arr = that.props.signArr;
      let index = that.props.addSignIndex;
      that.props.dispatch({
        type: 'Signins/postSignin',
        payload: arr[index].date,
      })
      .then((v={})=>{
        arr[index].id = true;
        that.handleModal('crystal',v.crystal)
        that.handleModal('signArr', arr);
        that .handleModal('count',{times: (that.props.count.times-0+1)})
        that.handleModal('modalAdd', true);
        that.handleModal('ifAdd',false);
      })
      that.props.dispatch({
        type: 'Signins/postShareId',
        payload:  meByOur.id || me.id
      }).then(v=>{
        // console.log(v)
      })
    }
   
  }

  handleModal = (name, value) => {
    this.props.dispatch({
      type: 'Signins/change',
      payload: {
        name,
        value
      }
    })
  }
  
handleBody = (params) => {
  const arr = Object.keys(params)
  const bol = arr.some(v => this.props[v])

  document.body.style.overflow = bol ? 'hidden' : 'initial'
}

  handleWxShare = (id) => {
    const wx = window.wx
    const that = this

    wx.ready(() => {
      let name = localStorage.me && localStorage.me.nickname || 'xxx'
      let title = `${name}邀请你参与签到赢水晶抽iPhone XS`
      let desc = `参与签到活动可获得随机水晶翻倍奖励瓜分巨额水晶，水晶最高可抽IPHONE XS。`
      let friendTitle = `${name}邀请你参与签到赢水晶抽iPhone XS参与签到可获得大量水晶，水晶最高可抽iPhone Xs`
      let params = JSON.stringify({
        url: '/indexHome',
        userId: id,
        from: 'Signins'
      })
      // const link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=like&hostId=${id}`
      let link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=${encodeURIComponent(params)}`
      // console.log(link, 'link')

      wx.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: shareimg, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('success')
          // that.shareModal(that)
          that.handleShareSuccess(that);
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('error')
          // that.shareModal(that)
        that.handleModal('ifAdd',false);
        that.handleShareCancel(that);
        }
      })

      wx.onMenuShareTimeline({
        title: friendTitle, // 分享标题
        link,
        imgUrl: shareimg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('success')
          // that.shareModal(that)
          that.handleShareSuccess(that);          
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('error')
        that.handleModal('ifAdd',false);
        that.handleShareCancel(that);
          // that.shareModal(that)
        }
      })

      // wx.onMenuShareQQ({
      //   title, // 分享标题
      //   desc, // 分享描述
      //   link, // 分享链接
      //   imgUrl: shareimg, // 分享图标
      //   success: function () {
      //     // that.shareModal(that)
      //     that.handleShareSuccess(that);

      //     // 用户确认分享后执行的回调函数
      //   },
      //   cancel: function () {
      //   that.handleModal('ifAdd',false);
      //   that.handleShareCancel(that);
      //     // that.shareModal(that)
      //     // 用户取消分享后执行的回调函数
      //   }
      // })

      // wx.onMenuShareWeibo({
      //   title, // 分享标题
      //   desc, // 分享描述
      //   link, // 分享链接
      //   imgUrl: shareimg, // 分享图标
      //   success: function () {
      //     // that.shareModal(that)
      //     that.handleShareSuccess(that);

      //     // 用户确认分享后执行的回调函数
      //   },
      //   cancel: function () {
      //   that.handleModal('ifAdd',false);
      //   that.handleShareCancel(that);
      //     // that.shareModal(that)
      //     // 用户取消分享后执行的回调函数
      //   }
      // })
    })
  }
 
  render() {
    // console.log(this.props)
    const {count,modalSuccess,modalShare, modalInfo, modalClose, modalAdd,signArr,magnify,crystal} = this.props
  
    let arr1 = signArr.slice(0,2)||[];
    let arr2 = signArr.slice(2,3)||[];
    let arr3 = signArr.slice(3,7)||[];
    let magnifyNum = arr2.length>0&&(arr2[0].couldMagnify?arr2[0].magnify:1)*5;
    // 系统个人信息
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    // 微信个人信息
    const me = localStorage.me ? JSON.parse(localStorage.me) : {}
    // 分享链接
    this.handleWxShare(meByOur.id||me.id)

    // 处理body不能滑动
    this.handleBody({
      modalSuccess,
      modalInfo,
      modalShare,
      modalClose,
      modalAdd
    })
    // 处理弹框
    // this.renderModal()
    // console.log(this.props, 'props')
    // console.log(count)
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <img src={bgimg} alt="index" className={styles.bgimg}/>
          <div className={styles.count}>
            <p className={styles.date}>{count.times}</p>
            <p className={styles.txt}>签到天数</p>
            <p className={styles.usertype}>
              <span>{arr2.length>0&&arr2[0].couldMagnify?'奖励用户':'普通用户'}</span>
            </p>
          </div>
          <div className={styles.board}>
              <div className={styles.line}></div>
              <div className={styles.yellowline}></div>
              <div className={styles.signins}>
              {/* 补签*/}
                {
                  arr1.length>0&&arr1.map((v,i)=>(
                    <div className={styles.signleft} key={i}  onClick={()=>this.addSignin(v.date,signArr,i)}>
                      <img src={v.id?signed:unsign}></img>
                      <span style={{visibility: v.id?'hidden':'visible'}}><img src={addSignin}></img></span>
                      <div className={styles.num}>{v.id?'✔':'0'}</div>
                      <div className={styles.date}>{moment(v.date).format('MM.DD')}</div>
                    </div>
                  ))
                }
                {/* 签到*/}
                {
                  arr2.length>0&&arr2.map((v,i)=>(
                    <div className={styles.signtoday} key={i} onClick={()=>{this.SignToday(v.date,signArr,count.times)}}>
                      <img src={v.id?today:unsign}></img>
                      <span style={{visibility: v.couldMagnify&&v.id ?'visible':'hidden'}}><img src={modify}></img></span>
                      <div className={styles.num} style={{visibility: v.id?'hidden':'visiable'}}>签到</div>
                      <div className={styles.date}>{v.id?'已签到':'未签到'}</div>
                    </div>
                  ))
                  
                }
                {/*往后4天显示是否翻倍*/}
                {
                  arr3.length>0&&arr3.map((v,i)=>(
                    <div className={styles.signright} key={i} onClick={()=>{alert("再等等，很快的 ( ･´ω`･ )")}}>
                      <img src={nextdays}></img>
                      <span style={{visibility: v.couldMagnify?'visible':'hidden'}}><img src={modify}></img></span>
                      <div className={styles.date}>{moment(v.date).format('MM.DD')}</div>
                    </div>
                  ))
                }
                {
                  arr3.length>0&&(<div className={styles.signright}  onClick={()=>{alert("再等等，很快的 ( ･´ω`･ )")}}>
                  <img src={nextdays}></img>
                  <div className={styles.date}>{moment(arr2[0].date).add(4,'days').format('MM.DD')}</div>
                  </div>)
                }
                
              </div>
              <div className={styles.btn}>
                <img src={signbtn}  onClick={()=>this.SignToday(arr2[0].date,signArr,count.times)}></img>
              </div>
              <div className={styles.word}>
                <p className={styles.firstline}>每天签到可得1~10随机水晶</p>
                <p className={styles.secondline}>购买盒子后可解锁3天签到水晶翻倍奖励！最高可翻50倍！</p>
              </div>
          </div>
          <img src={BuyBox} className={styles.buybox} onClick={()=>{this.props.history.push('/home')}}/>
        </div>
        
       
        {/* 活动下线 modalColse*/}
        <div className={`${styles.modal} ${styles.modalSuccess}`} style={{visibility: this.props.modalClose ? 'visible' :'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={close} alt="success"/>
            <div className={styles.closeSuccess} onClick={() => {this.props.history.push('/')}}/>
          </div>
        </div>
        {/* 签到成功 modalSuccess*/}
        <div className={`${styles.modal} ${styles.modalSuccess}`} style={{visibility: this.props.modalSuccess ? 'visible' :'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={success} alt="success"/>
            <div className={styles.magnify}>{crystal} 水晶</div>
            <div className={styles.closeSuccess} onClick={() => {this.handleModal('modalSuccess', false); }}/>
            <div className={styles.toCard} onClick={()=>this.props.history.push('/SelectCard')}></div>
          </div>
        </div>
        {/* 补签攻略 modalInfo*/}
        <div className={`${styles.modal} ${styles.modalInfo}`} style={{visibility: this.props.modalInfo ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={checkInAdd} alt="info"/>
            <div className={styles.btn} onClick={() => this.handleNotShare()}/>
            <div className={styles.shareBtn} onClick={()=>this.handleWillShare()}></div>
            <div className={styles.shareToCard} onClick={()=>this.props.history.push('/indexHome')}></div>
          </div>
        </div>
        {/* 补签成功 modalAdd*/}
        <div className={`${styles.modal} ${styles.modalSuccess}`} style={{visibility: this.props.modalAdd ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={add} alt="success"/>
            <div className={styles.magnify}><span className={styles.number}>{crystal}</span>水晶</div>
        
            <div className={styles.closeSuccess} onClick={() => {this.handleModal('modalAdd', false);this.handleModal('ifAdd',false);}}/>
            <div className={styles.toCard} onClick={()=>this.props.history.push('/indexHome')}></div>
          </div>
        </div>
        {/* 分享 modalShare */}
        <div className={`${styles.modal} ${styles.modalShare}`} style={{visibility: this.props.modalShare ? 'visible' : 'hidden'}}>
          <img src={Share} alt="modalShare"/>
          <div className={styles.imgWrap} onClick={() => this.handleShareCancel(this)}/>
        </div>
      </div>
    );
  }
}

SelectCard.propTypes = {};

const mapStateToProps = state => {
  return {
    modalInfo: state.Signins.modalInfo,
    modalShare: state.Signins.modalShare,
    modalSuccess: state.Signins.modalSuccess,
    modalAdd: state.Signins.modalAdd,
    modalClose: state.Signins.modalClose,
    signArr: state.Signins.signArr,
    count: state.Signins.count,
    addSignIndex: state.Signins.addSignIndex,
    ifAdd: state.Signins.ifAdd,
    couldToday: state.Signins.couldToday,
    crystal: state.Signins.crystal,
    magnify: state.Signins.magnify,
  };
};

export default connect(mapStateToProps)(SelectCard);
