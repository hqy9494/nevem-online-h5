import { Component } from 'react';
import { connect } from 'dva';
import styles from './CheckIn.scss';
import moment from 'moment'

import { Modal } from 'antd-mobile';

import bgImg from '../../assets/Img/checkIn/bgImg.png';
import buttonImg from '../../assets/Img/checkIn/button.png';
import checkInAddImg from "../../assets/Img/checkIn/checkInAdd.png";
import checkInShare from "../../assets/Img/checkIn/share.png";
import checkInAddSuccess from "../../assets/Img/checkIn/checkInSuccess.png";
import checkInSuccess from "../../assets/Img/checkIn/checkSuccess.png";
import shareimg from '../../assets/Img/checkIn/sharewximg.png';
import shareFile from '../../assets/Img/checkIn/shareFail.png';
import todayOk from '../../assets/Img/checkIn/todayOk.png';

import CheckInStatus from '../../components/CheckIn/CheckInStatus';
import common from '../../common/common'

const alert = Modal.alert;

class CheckIn extends Component{

  state = {
    timeall: moment(new Date()).format('YYYY-MM-DD'),
    isCheckIn: false,
    isAddTime: '',
    isAddCheckIn: false,
  }

  componentWillMount(){
    this.props.dispatch({type: 'checkIn/getCheckInGlobal'}).then((v={}) => {
      if(!v.enable){
        alert('活动结束'); // 。。。
      }
    })
    this.props.dispatch({type: 'checkIn/getCheckInInfo'}).then((v={}) => {
//			console.log(v, '签到信息')
    })
    this.props.dispatch({type: 'checkIn/getCheckInUser'}).then((v={}) => {
//			console.log(v, '用户信息')
    })
  }

  regainInfo = () => {
    this.props.dispatch({type: 'checkIn/getCheckInInfo'})
    this.props.dispatch({type: 'checkIn/getCheckInUser'})
  }

  handleModal = (name, bool) => {
//	console.log(name, '操作模态')
    let obj = {}
    obj[name] = bool;
    this.setState(obj)
  }

  handleModalToday = (name, bool) => {
    const { timeall } = this.state;

    let doubleFlag = localStorage.getItem(this.state.timeall); // 获取是否点击翻牌
    let doubleCrystal = localStorage.getItem('crystal'); // 获取是否有今天签到水晶
    //今天是否可以签到
    //!this.props.isCanToday
    this.setState({
      isAddCheckIn: false  // 操作签到成功弹框
    })

    if(doubleFlag == 'false'){   // 没有点击 弹出
      this.handleModal('modalSuccess', true)
      return
    }else if(doubleFlag == 'true'){ //点击了 提示已签到
      // alert('你已经签到了，改天再来吧！');
      this.handleModal('modalTodayOk', true)
      return
    }
    this.submitCheckIn(timeall)

    this.handleModal(name, bool)

  }

  handleShareAfter = () => {
    // console.log('分享之后')
    this.setState({ isAddCheckIn: true })
    this.submitCheckIn(this.state.isAddTime)
  }

  handleModalAdd = (name, bool) => { //补签提
    this.handleModal(name, bool)
		// this.handleShareAfter()   //...............
  }

  addCheckIn = (t) => { //操作补签弹框
//		console.log(t, '补签时间')
    this.setState({
      isAddTime: t
    })
    this.handleModal('modalAdd', true)
  }

  handleWxShare = (userId) => {  // 微信分享
    const wx = window.wx

    const that = this

//  console.log(that)

    wx.ready(() => {
      let name = localStorage.me && localStorage.me.nickname || ''
      let title = `${name}邀请你参与签到赢水晶抽iPhone XS`
      let desc = `参与签到可获得大量水晶，水晶最高可抽iPhone XS`
      let friendTitle = `${name}邀请你参与签到赢水晶抽iPhone XS`

      let params = JSON.stringify({
        url: '/indexHome',
        userId,
        from: 'checkin'
      })
      let link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=${encodeURIComponent(params)}`
      console.log(link, 'link')

      if (!userId) return

      wx.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: shareimg, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('success', link)
          setTimeout(function(){
            that.handleShareAfter()
          }, 300)
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('error', link)
        }
      })

      wx.onMenuShareTimeline({
        title: friendTitle, // 分享标题
        link,
        imgUrl: shareimg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('success')
          setTimeout(function(){
            that.handleShareAfter()
          }, 300)
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('error')
        }
      })


      // 要隐藏的菜单项
      wx.hideMenuItems({
        menuList: [
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            "menuItem:editTag",
            "menuItem:delete",
            "menuItem:copyUrl",
            "menuItem:originPage",
            "menuItem:readMode",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari",
            "menuItem:share:email",
            "menuItem:share:brand",
        ],
        success: function(){
          console.log('隐藏成功')
        },
        fail: function(err){
          console.log(err, 'error')
        }
      });

    })
  }

  handleChoosePrize = () => {
//		console.log('翻牌抽奖')
    localStorage.setItem(this.state.timeall, true)  //点击翻牌存入签到时间和标志
    if(this.state.isAddCheckIn){
      window.location.href = '#/indexHome';
    }else{
      this.props.history.push('/SelectCard')  // 补签成功不跳翻牌跳买盒子  签到成功跳翻牌
      //  '/CheckIn/Double'
    }
  }

  handleBuyBox = () => {
//		console.log('买盒')
    window.location.href = '#/indexHome';
  }

  handldAds = () => {
    window.location.href = '#/indexHome';
    window.scrollTo(0, 0)
  }

  submitCheckIn = (time) => {  //提交签到
    this.props.dispatch({
      type: 'checkIn/postCheckIn',
      payload: {
        date: time
      }
    }).then((v={})=>{
      if(v){ // 签到成功
        console.log(v, 'qdcg')
        let crystalNum = v.crystal || 0
        if(this.props.isCanToday && !this.state.isAddCheckIn){    //是今日签到并且不是补签
          localStorage.setItem('crystal', crystalNum)             //存入今日水晶数
          localStorage.setItem(this.state.timeall, false)         //存入时间并且非翻牌 补签情况不作处理
          this.setState({
            crystalToday: crystalNum
          })
          console.log(this.props.isCanToday, 'cantoday')
        }
        this.handleAllModalClose()
        this.regainInfo()
      }
    })
  }

  handleCloseShare = () => {
    this.handleModal('modalShare', false)
    this.handleModal('modalShareFail', true)
    // alert('亲，你没分享成功哦~~', '', [
    //   { text: '我知道了', onPress: () => console.log('cancel') },
    //   {
    //     text: '马上分享',
    //     onPress: () =>
    //       this.handleModal('modalShare', true)
    //   },
    // ])
  }

  handleAllModalClose = () => {
    this.setState({
      modalAdd: false,
      modalShare: false,
      modalSuccess: true,
    })
  }

  render(){
    const { checkInInfo, checkInUser, checkInAdd } = this.props;
    // 系统个人信息
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    // 分享链接
    this.handleWxShare(meByOur.id)

    const last = {
      couldMagnify: false,
      date: moment(new Date()).add(4, 'days').format("YYYY-MM-DD")
    };

    const crystalToday = localStorage.getItem('crystal')

    return (
      <div className={styles.container}>
        <img className={styles.bgImg} src={bgImg}/>
        <div className={styles.dayBox}>
          <span className={styles.dayNum}>{checkInUser.times?checkInUser.times:0}</span>
          <span className={styles.dayTitle}>签到天数</span>
          {/*<span className={styles.userType}>普通用户</span>*/}
        </div>
        <div className={styles.stepBox}>
          {
            checkInInfo && checkInInfo.map((v, i) => (
              <CheckInStatus handleAddCheckIn={this.addCheckIn.bind(this)} key={i} dayInfo={v} />
            ))
          }
          {/*<CheckInStatus  dayInfo={last} />*/}
        </div>
        <div className={styles.btnBox} onClick={() => this.handleModalToday('modalSuccess', true)}>
          <img src={buttonImg} />
        </div>
        <div className={styles.descript}>
          <p className={styles.p1}>每天签到可得1～10随机水晶</p>
          <p className={styles.p2}>购买盒子后可解锁3天签到水晶翻倍奖励！最高可翻50倍！</p>
        </div>

        {/*广告跳转*/}
        <div className={styles.adHref} onClick={
          () => {
            this.handldAds()
          }} />

        {/* 补签弹框 */}
        <div className={`${styles.modal} ${styles.modalAdd}`} style={{visibility: this.state.modalAdd ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={checkInAddImg} alt="check in add"/>
            <div className={styles.btn} onClick={() => this.handleModal('modalAdd', false)}/>
            <div className={styles.btnShare}
                 onClick={
                   () => {
                     this.handleModal('modalAdd', false)
                     this.handleModalAdd('modalShare', true)
                   }
                 }
            />
            <div className={styles.btnBuyBox}
                 onClick={
                   () => {
                     this.handleBuyBox()
                   }
                 }
            />
          </div>
        </div>

        {/* 分享引导  */}
        <div className={`${styles.modal} ${styles.modalShare}`} style={{visibility: this.state.modalShare ? 'visible' : 'hidden'}}>
          <img src={checkInShare} alt="check in share"/>
          <div className={styles.close} onClick={() => this.handleCloseShare()}/>
        </div>

        {/* 签到补签成功  */}
        <div className={`${styles.modal} ${styles.modalSuccess}`} style={{visibility: this.state.modalSuccess ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={this.state.isAddCheckIn?checkInAddSuccess:checkInSuccess} alt="check in success"/>
            <div className={styles.scoresBox}>
              <p>{this.state.isAddCheckIn?checkInAdd.crystal||0:crystalToday}水晶</p>
            </div>
            <div className={styles.btn} onClick={() => this.handleModal('modalSuccess', false)}/>
            <div className={styles.btnBuyIphone}
                 onClick={
                   () => {
                     this.handleChoosePrize()
                   }
                 }
            />
          </div>
        </div>

        {/*取消分享弹框*/}
        <div className={`${styles.modal} ${styles.modalShareFail}`} style={{visibility: this.state.modalShareFail ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={shareFile} alt=""/>
            <div className={styles.btn} onClick={() => this.handleModal('modalShareFail', false)}/>
            <div className={styles.btnShare}
                 onClick={
                   () => {
                     this.handleModal('modalShareFail', false)
                     this.handleModalAdd('modalShare', true)
                   }
                 }
            />
            <div className={styles.btnBuyBox}
                 onClick={
                   () => {
                     this.handleBuyBox()
                   }
                 }
            />
          </div>
        </div>

        {/*今天已签弹框*/}
        <div className={`${styles.modal} ${styles.modalTodayOk}`} style={{visibility: this.state.modalTodayOk ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={todayOk} alt=""/>
            <div className={styles.btn} onClick={() => this.handleModal('modalTodayOk', false)}/>
            <div className={styles.btnBuyBox}
                 onClick={
                   () => {
                     this.handleBuyBox()
                   }
                 }
            />
          </div>
        </div>

      </div>
    )
  }
}


CheckIn.propTypes = {};

const mapStateToProps = state => {
  return {
    golbalData: state.checkIn.golbalData,
    checkInInfo: state.checkIn.checkInInfo,
    checkInUser: state.checkIn.checkInUser,
    checkInAdd: state.checkIn.checkInAdd,
    isCanToday: state.checkIn.isCanToday,
  }
}

export default connect(mapStateToProps)(CheckIn);
