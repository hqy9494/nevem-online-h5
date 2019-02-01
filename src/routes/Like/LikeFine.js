import { Component } from "react"
import { connect } from "dva"
import moment from 'moment'
import styles from "./LikeFine.scss"
import LikeStyle from "./Like.scss"
import index2 from "../../assets/Img/crystal/index2.png"
import btn1 from "../../assets/Img/crystal/btn1.png"
import btn3 from "../../assets/Img/crystal/btn3.png"
import btn4 from "../../assets/Img/crystal/btn4.png"
import crown from "../../assets/Img/crystal/crown.png"
import fail from '../../assets/Img/crystal/fail.png'
import like from '../../assets/Img/crystal/like.png'
import timeout from '../../assets/Img/crystal/timeout.png'
import crystal from '../../assets/Img/crystal/crystal.png'
import findLike from '../../assets/Img/crystal/findLike.png'
import avatar from '../../assets/Img/crystal/avatar.png'
import {parseParameter} from '../../utils/utils'
import ModalPkSuccess from '../../components/Like/ModalPkSuccess'
import shareimg from '../../assets/Img/crystal/sharewximg.png'
import crystalnew from '../../assets/Img/crystal/crystalnew.png'
import crystalnewbtn1 from '../../assets/Img/crystal/crystalnewbtn1.png'
import crystalnewbtn2 from '../../assets/Img/crystal/crystalnewbtn2.png'
import common from '../../common/common'

class LikeFine extends Component {
  state = {
    time: '00:00:00'
  }
  componentWillMount(){
    let params = parseParameter()

    if (params['hostId']) {
      this.props.dispatch({type: 'likeFine/change', payload: {name: 'hostId', value: params['hostId']}})
    }

    if (params['teamId']) {
      this.props.dispatch({type: 'likeFine/change', payload: {name: 'teamId', value: params['teamId']}})
    }

    this.handleLikeFine(params)
  }
  handleLikeFine = (params) => {
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}

    this.props.dispatch({type: 'likeFine/getSetting'}).then(v => {
      // 活动是否结束
      if (!v.enable) {
        // 提示：活动结束
        this.props.dispatch({type: 'likeFine/change', payload: {name: 'modalTimeout', value: false}})
      }else {
        if (params['teamId']){
          // 请求点赞战队
          this.props.dispatch({type: 'likeFine/getDetail', payload: {id: params['teamId'], name: 'teamData'}}).then(v => {
            // 请求敌方战队
            if  (v.againstTeamId){
              this.props.dispatch({type: 'likeFine/getDetail', payload: {id: v.againstTeamId, name: 'againstTeam'}})
            }

            // 点赞（判断是不是自己点赞）
            if (params['hostId'] !== meByOur.id) {
              this.props.dispatch({type: 'likeFine/support', payload: params}).then(v => {
                // 提示：点赞成功
                if (v && v.support && v.support.crystal) {
                  // 点赞获得水晶
                  this.props.dispatch({type: 'likeFine/change', payload: {name: 'crystalNum', value: v.support.crystal}})
                  this.props.dispatch({type: 'likeFine/change', payload: {name: 'modalCrystal', value: true}})
                }

                // 更新队伍信息
                this.props.dispatch({type: 'likeFine/getDetail', payload: {id: params['teamId'], name: 'teamData'}}).then(v => {
                  if  (v.againstTeamId){
                    this.props.dispatch({type: 'likeFine/getDetail', payload: {id: v.againstTeamId, name: 'againstTeam'}})
                  }
                })
              })
            }

            this.props.dispatch({type: 'likeFine/getYdayReward'}).then((v = {}) => {
              // 是否结算
              if (Object.keys(v).length === 0 || !v.isChecked) {
                // 没有结算 开始倒计时
                this.time = setInterval(this.handleTime, 1000)
                this.props.dispatch({type: 'likeFine/change', payload: {name: 'isTime', value: true}})
              } else {
                // 结算，提示状态
                this.afterTimeout(v)
              }
            })
          })
        } else {
          // 组队成功后自己进来

          // 开始倒计时
          this.time = setInterval(this.handleTime, 1000)
          this.props.dispatch({type: 'likeFine/change', payload: {name: 'isTime', value: true}})

          // 查看战队情况（自己和对方）
          this.props.dispatch({type: 'likeFine/getMyTeam'})
        }
      }
    })
  }
  handleTime = () => {
    let now = moment()
    let end = moment().endOf('days')
    let diff = end.diff(now)
    let hours = Math.floor(diff / 1000 / 60 / 60)
    let minute = Math.floor(diff / 1000 / 60 - hours * 60)
    let second = Math.floor(diff / 1000 - hours * 60 * 60 - minute * 60)

    if (!this.props.isTime) {
      clearTimeout(this.time)
      return
    }

    if (diff > 0) {
      this.setState({
        time: `${this.fixTime(hours)}:${this.fixTime(minute)}:${this.fixTime(second)}`
      })
    } else {
      // 倒计时结束
      clearTimeout(this.time)
      this.props.dispatch({type: 'likeFine/change', payload: {name: 'isTime', value: false}})

      // 判断是否结算
      this.props.dispatch({type: 'likeFine/getYdayReward'}).then((v = {}) => {
        // 结算
        if (Object.keys(v).length !== 0 && v.isChecked) {
          this.afterTimeout(v)
        }
      })
      // if (this.props.teamId) {
      //   this.props.dispatch({type: 'likeFine/getMyTeam'}).then(v => {
      //     this.afterTimeout(v)
      //   })
      // } else {
      //   this.props.dispatch({type: 'likeFine/getDetail', payload: {id: this.props.teamId, name: 'teamData'}}).then(v => {
      //     if  (v.againstTeamId){
      //       this.props.dispatch({type: 'likeFine/getDetail', payload: {id: v.againstTeamId, name: 'againstTeam'}})
      //     }
      //
      //     this.afterTimeout(v)
      //   })
      // }
    }
  }
  afterTimeout = (v) => {
    // 每天只提示一次
    if (!localStorage[`modalPkSuccess:${moment().format('YYYY-MM-DD')}`]) {
      // 提示队伍状态
      if (v.crystal) {
        // 提示：pk成功
        this.props.dispatch({type: 'likeFine/change', payload: {name: 'modalPkSuccess', value: true}})
      } else {
        // 提示：pk失败
        this.props.dispatch({type: 'likeFine/change', payload: {name: 'modalPkFail', value: true}})
      }
    }
  }
  fixTime = (num) => {
    return `0${num}`.slice(-2)
  }
  componentWillUnmount(){
    clearTimeout(this.time)
  }
  handleWxShare = (hostId, teamId) => {
    const wx = window.wx

    wx.ready(() => {
      let name = localStorage.me && localStorage.me.nickname || ''
      let title = `${name}邀请你参与组队PK赢水晶抽Iphone XS`
      let desc = `满4人组队即可参与PK赛，胜出的队伍瓜分巨额水晶，水晶最高可抽IPHONE XS。`
      let friendTitle = `${name}邀请你参与组队PK赢水晶抽Iphone XS`

      let params = JSON.stringify({
        url: '/like/fine',
        hostId,
        teamId
      })
      // const link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=like&hostId=${id}`
      let link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=${encodeURIComponent(params)}`
      console.log(link, 'link')

      if (!hostId || !teamId) return

      wx.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: shareimg, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('success', link)
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
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('error')
        }
      })

      wx.onMenuShareQQ({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl: shareimg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })

      wx.onMenuShareWeibo({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl: shareimg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  }
  handleModal = (name, value) => {
    this.props.dispatch({
      type: 'likeFine/change',
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
  handleCountRate = (a, b) => {
    const my = Number(a || 0)
    const against = Number(b || 0)
    const sum = my + against

    if (my === against) return 50
    if (my !== 0 && against === 0) return 100

    return Math.floor(my / sum * 100)
  }
  toLike = () => {
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    // 分享后，点赞的人，有可能有自己的队伍
    let param = {}

    if (meByOur) {
      param['hostId'] = meByOur.id
    }
    let str = this.combindUrlParam(param)

    this.props.dispatch({
      type: 'like/beforeCheckUser',
    }).then(v => {
      const {checkUser, teamData} = v
      // 判断是否组队成功（满4人）
      if (teamData.enable) {
        this.handleLikeFine({
          hostId: meByOur.id,
          teamId: teamData.id
        })
      } else{
        this.props.history.replace(`/like${str}`)
      }
    })
  }
  combindUrlParam = (obj) => {
    let str = ''
    for(let i of Object.keys(obj)){
      str += `&${i}=${obj[i]}`
    }

    str = str ? `?${str.slice(1)}` : ''

    return str
  }
  isMyTeam = (teamData) => {
    if (!teamData) return false
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    const {leaderId, memberList} = teamData

    if (!leaderId || !memberList || !Array.isArray(memberList) || !meByOur.id) return false

    return [...memberList, leaderId].includes(meByOur.id)
  }
  render() {
    const {teamData, againstTeam, YdayReward, isTime, hostId} = this.props
    const countRate = this.handleCountRate(teamData.support, againstTeam.support)
    const diffCount = (teamData.support - againstTeam.support) || 0
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    const params = parseParameter()

    // 分享链接
    this.handleWxShare(meByOur.id, params['teamId'])

    // 处理body不能滑动
    this.handleBody({
      modalPkSuccess: this.props.modalPkSuccess,
      modalMember: this.props.modalMember,
      modalPkFail: this.props.modalPkFail,
      // modalLike: this.props.modalLike,
      modalTimeout: this.props.modalTimeout,
      modalShare: this.props.modalShare,
      modalCrystal: this.props.modalCrystal,
      modalFindLike: this.props.modalFindLike
    })
    // console.log(this.props, 'likeFine')
    return (
      <div className={styles.page}>
        <img src={index2} alt="index" className={styles.img}/>
        <div className={styles.scaleWrap}>
          <div className={styles.scale}>
            <div className={styles.slip} style={{width: `${countRate}%`}}></div>
          </div>
          <div className={styles.scaleFont}>
            <div>我方点赞数{teamData.support || 0}</div>
            <div>对方点赞数{againstTeam.support || 0}</div>
          </div>
        </div>
        <div className={styles.time}>
          {
            isTime ? this.state.time : '00:00:00'
            // this.state.time
          }
        </div>
        <div className={styles.box}>
          <div className={`${styles.child} ${styles.childLeft}`}>
            {
              teamData.leader && <div className={styles.item}>
                <div className={styles.itemLeft}>
                  <img src={teamData.leader.avatar || avatar} alt="avatar"/>
                  <img src={crown} alt="crown" className={styles.crown}/>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.name}>{teamData.leader.nickname || '合伙人'}</div>
                  <div className={styles.num}>+{teamData.supportDetail && teamData.supportDetail[teamData.leader.id] || 0} 赞</div>
                </div>
              </div>
            }
            {
              teamData.members && teamData.members.map((v, i) => (
                <div className={styles.item} key={i}>
                  <div className={styles.itemLeft}>
                    <img src={v.avatar || avatar} alt="avatar"/>
                  </div>
                  <div className={styles.itemRight}>
                    <div className={styles.name}>{v.nickname || '合伙人'}</div>
                    <div className={styles.num}>+{teamData.supportDetail && teamData.supportDetail[v.id] || 0} 赞</div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className={`${styles.child} ${styles.childRight}`}>
            {
              againstTeam.leader && <div className={styles.item}>
                <div className={styles.itemLeft}>
                  <img src={againstTeam.leader.avatar || avatar} alt="avatar"/>
                  <img src={crown} alt="crown" className={styles.crown}/>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.name}>{againstTeam.leader.nickname || '合伙人'}</div>
                  <div className={styles.num}>+{againstTeam.supportDetail && againstTeam.supportDetail[againstTeam.leader.id] || 0} 赞</div>
                </div>
              </div>
            }
            {
              againstTeam.members && againstTeam.members.map((v, i) => (
                <div className={styles.item} key={i}>
                  <div className={styles.itemLeft}>
                    <img src={v.avatar || avatar} alt="avatar"/>
                  </div>
                  <div className={styles.itemRight}>
                    <div className={styles.name}>{v.nickname || '合伙人'}</div>
                    <div className={styles.num}>+{againstTeam.supportDetail && againstTeam.supportDetail[v.id] || 0} 赞</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {
          diffCount > 0 ?
            <div className={styles.lackNum}>你已领先<span>{diffCount}</span>个赞，请再接再厉</div> :
            <div className={styles.lackNum}>你还缺<span>{diffCount === 0 ? diffCount + 1 : (-diffCount + 1)}</span>个赞即可战胜对手</div>
        }
        <div className={LikeStyle.bottom}>
          {
            this.isMyTeam(teamData) ? (
              <div className={LikeStyle.bottomItem} onClick={() => this.handleModal('modalFindLike', true)}>
                <img src={btn3} alt="btn3"/>
              </div>
            ) : (
              <div className={LikeStyle.bottomItem} onClick={() => this.toLike()}>
                <img src={btn1} alt="btn1"/>
              </div>
            )
          }
          <div className={LikeStyle.bottomItem} onClick={() => this.props.history.push('/like/more')}>
            <img src={btn4} alt="btn4"/>
          </div>
        </div>
        {/* pk成功 Index*/}
        <ModalPkSuccess
          history={this.props.history}
          YdayReward={this.props.YdayReward}
          isModal={this.props.modalPkSuccess}
        />
        {/*<div className={`${LikeStyle.modal} ${styles.modalPkSuccess}`} style={{visibility: this.props.modalPkSuccess ? 'visible' : 'hidden'}}>*/}
          {/*<img src={pkSuccess} alt="pkSuccess"/>*/}
          {/*<div className={styles.list}>*/}
            {/*{*/}
              {/*YdayReward.leader && <div className={styles.item}>*/}
                {/*<div className={styles.itemLeft}>*/}
                  {/*<img src={YdayReward.leader.avatar} alt="img"/>*/}
                {/*</div>*/}
                {/*<div className={styles.itemCenter}>*/}
                  {/*<div className={styles.itemCenterName}>{YdayReward.leader.nickname}</div>*/}
                  {/*<div className={styles.itemCenterSub}>队长额外提成</div>*/}
                {/*</div>*/}
                {/*<div className={styles.itemRight}>*/}
                  {/*<div className={styles.itemRightNum}>+{YdayReward.crystal / 5}水晶</div>*/}
                  {/*<div className={styles.itemRightSub}>+{YdayReward.crystal / 5}水晶</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*}*/}
            {/*{*/}
              {/*YdayReward.members && YdayReward.members.map((v, i) => (*/}
                {/*<div className={styles.item} key={i}>*/}
                  {/*<div className={styles.itemLeft}>*/}
                    {/*<img src={v.avatar} alt="img"/>*/}
                  {/*</div>*/}
                  {/*<div className={styles.itemCenter}>*/}
                    {/*<div className={styles.itemCenterName}>{v.nickname}</div>*/}
                  {/*</div>*/}
                  {/*<div className={styles.itemRight}>*/}
                    {/*<div className={styles.itemRightNum}>+{YdayReward.crystal / 5}水晶</div>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*))*/}
            {/*}*/}
          {/*</div>*/}
          {/*<div className={`${styles.modalPkSuccessBtn} ${styles.modalPkSuccessBtn1}`} onClick={() => {*/}
            {/*this.handleModal('modalPkSuccess', false)*/}
            {/*this.props.history.replace(`/login?openId=${localStorage.openId}&to=${encodeURIComponent(`/like`)}`)*/}
          {/*}}/>*/}
          {/*<div className={`${styles.modalPkSuccessBtn} ${styles.modalPkSuccessBtn2}`} onClick={() => {*/}
            {/*this.handleModal('modalPkSuccess', false)*/}
            {/*this.props.history.push('/game')*/}
          {/*}}/>*/}
        {/*</div>*/}

        {/* pk失败 modalPkFail */}
        <div className={`${LikeStyle.modal} ${styles.modalFail}`} style={{visibility: this.props.modalPkFail ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={fail} alt="modalFail"/>
            <div className={styles.btn} onClick={() => {
              this.handleModal('modalPkFail', false)
              localStorage[`modalPkSuccess:${moment().format('YYYY-MM-DD')}`] = 1
              this.toLike()
              // this.props.history.replace(`/like?openId=${localStorage.openId}`)
            }}/>
          </div>
        </div>

        {/* 点赞成功 modalLike */}
        {/*<div className={`${LikeStyle.modal} ${styles.modalLike}`} style={{visibility: this.props.modalLike ? 'visible' : 'hidden'}}>*/}
          {/*<div className={styles.imgWrap}>*/}
            {/*<img src={like} alt="modalLike"/>*/}
            {/*<div className={styles.left} onClick={() => {*/}
              {/*this.handleModal('modalLike', false)*/}
              {/*this.handleModal('modalCrystal', true)*/}
            {/*}}/>*/}
            {/*<div className={styles.right} onClick={() => {*/}
              {/*this.handleModal('modalLike', false)*/}
              {/*this.toLike()*/}
              {/*// this.props.history.replace(`/like?openId=${localStorage.openId}`)*/}
            {/*}}/>*/}
          {/*</div>*/}
        {/*</div>*/}

        {/* 超时 modalTimeout */}
        <div className={`${LikeStyle.modal} ${styles.modalTimeout}`} style={{visibility: this.props.modalTimeout ? 'visible' : 'hidden'}}>
          <img src={timeout} alt="modalTimeout"/>
        </div>

        {/* 点赞成功后获得水晶 modalCrystal */}
        <div className={`${LikeStyle.modal} ${styles.modalCrystal}`} style={{visibility: this.props.modalCrystal ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={crystalnew} alt="modalCrystal"/>
            <div className={styles.close} onClick={() => this.handleModal('modalCrystal', false)}/>
            <div className={styles.crystal} onClick={() => {
              this.handleModal('modalCrystal', false)
              this.props.history.replace('/indexHome')
            }}>
              <img src={crystalnewbtn1} alt="img"/>
            </div>
            <div className={styles.toLike} onClick={() => {
              this.handleModal('modalCrystal', false)
              // this.props.history.replace(`/like?openId=${localStorage.openId}`)
              this.toLike()
            }}>
              <img src={crystalnewbtn2} alt="img"/>
            </div>
            <div className={styles.crystalFont}>获得{this.props.crystalNum || 0}点水晶</div>
          </div>
        </div>

        {/* 分享 */}
        <div className={`${LikeStyle.modal} ${styles.modalFindLike}`} style={{visibility: this.props.modalFindLike ? 'visible' : 'hidden'}}>
          <img src={findLike} alt="modalFindLike"/>
          <div className={styles.close} onClick={() => this.handleModal('modalFindLike', false)}/>
        </div>
      </div>
    );
  }
}

LikeFine.propTypes = {};

const mapStateToProps = state => {
  return {
    teamData: state.likeFine.teamData,
    againstTeam: state.likeFine.againstTeam,
    YdayReward: state.likeFine.YdayReward,
    hostId: state.likeFine.hostId,
    isTime: state.likeFine.isTime,
    crystalNum: state.likeFine.crystalNum,

    modalPkSuccess: state.likeFine.modalPkSuccess,
    modalMember: state.likeFine.modalMember,
    modalPkFail: state.likeFine.modalPkFail,
    // modalLike: state.likeFine.modalLike,
    modalTimeout: state.likeFine.modalTimeout,
    modalShare: state.likeFine.modalShare,
    modalCrystal: state.likeFine.modalCrystal,
    modalFindLike: state.likeFine.modalFindLike
  };
};

export default connect(mapStateToProps)(LikeFine);
