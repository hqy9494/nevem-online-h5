import { Component } from "react"
import { connect } from "dva"
import styles from "./Like.scss"
import FineStyle from "./LikeFine.scss"
import index from "../../assets/Img/crystal/index.png"
import plus from "../../assets/Img/crystal/plus.png"
import success from "../../assets/Img/crystal/success.png"
import info from "../../assets/Img/crystal/info.png"
import crown from "../../assets/Img/crystal/crown.png"
import btn1 from "../../assets/Img/crystal/btn1.png"
import btn2 from "../../assets/Img/crystal/btn2.png"
import findTeam from '../../assets/Img/crystal/findTeam.png'
import member from '../../assets/Img/crystal/member.png'
import common from '../../common/common'
import {parseParameter} from '../../utils/utils'
import avatar from '../../assets/Img/crystal/avatar.png'
import shareimg from '../../assets/Img/crystal/sharewximg.png'
import moment from 'moment'

class Like extends Component {
  state = {}
  componentWillMount(){
    let params = parseParameter()

    // 是否结算
    this.props.dispatch({type: 'likeFine/getYdayReward'}).then((v = {}) => {
      // 没有结算
      if (localStorage[`modalPkSuccess:${moment().format('YYYY-MM-DD')}`] || Object.keys(v).length === 0 || !v.isChecked) {
        this.props.dispatch({
          type: 'like/beforeCheckUser',
        }).then(v => {
          const {checkUser, teamData} = v
          // 没有组队、当过队员
          if (!checkUser.hasTeam && !checkUser.joinAble){
            this.props.dispatch({type: `like/change`, payload: {name: 'modalMember', value: true}})
          }else{
            // 组队
            this.props.dispatch({type: 'like/afterCheckUser', payload: {hostId: params['hostId'], checkUser}}).then(v => {
              // 组队是否成功
              if (v) {
                if (v.enable) {
                  this.props.dispatch({type: 'like/getMyTeam'}).then(v => {
                    // 组队满人，跳去ok，此时没有teamId
                    this.props.history.replace(`/like/fine?hostId=${params['hostId']}&teamId=${v.id}`)
                  })
                } else {
                  // 组队没满（因为刚假如了战队，需要刷新数据）
                  this.props.dispatch({type: 'like/getCheckUser'})
                  this.props.dispatch({type: 'like/getMyTeam'})
                }
              }
            })
          }
        })
      } else {
        // 结算
        this.props.history.replace(`/like/fine?hostId=${params['hostId']}&teamId=${v.id}`)
      }
    })
  }

  handleMember = (member = []) => {
    const num = 3
    let arr = [...member]

    for (let i = 0; i < num; i ++) {
      arr[i] = arr[i] ? arr[i] : {
        avatar: plus,
        nickname: '邀请好友'
      }
    }

    return arr
  }
  handleModal = (name, value) => {
    this.props.dispatch({
      type: 'like/change',
      payload: {
        name,
        value
      }
    })
  }
  addMember = (v) => {
    if (!v.id) this.handleModal('modalFindTeam', true)
  }
  shareModal = (that) => {
    that.props.diapatch({type: 'like/change', payload: {name: 'modalFindTeam', value: false}})
  }
  handleWxShare = (id) => {
    const wx = window.wx
    const that = this

    wx.ready(() => {
      let name = localStorage.me && localStorage.me.nickname || ''
      let title = `${name}邀请你参与组队PK赢水晶抽Iphone XS`
      let desc = `满4人组队即可参与PK赛，胜出的队伍瓜分巨额水晶，水晶最高可抽IPHONE XS。`
      let friendTitle = `${name}邀请你参与组队PK赢水晶抽Iphone XS`

      let params = JSON.stringify({
        url: '/like',
        hostId: id,
        from: 'like'
      })
      // const link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=like&hostId=${id}`
      let link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=${encodeURIComponent(params)}`
      console.log(link, 'link')

      wx.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: shareimg, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('success')
          that.shareModal(that)
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('error')
          that.shareModal(that)
        }
      })

      wx.onMenuShareTimeline({
        title: friendTitle, // 分享标题
        link,
        imgUrl: shareimg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('success')
          that.shareModal(that)
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('error')
          that.shareModal(that)
        }
      })

      wx.onMenuShareQQ({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl: shareimg, // 分享图标
        success: function () {
          that.shareModal(that)
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          that.shareModal(that)
          // 用户取消分享后执行的回调函数
        }
      })

      wx.onMenuShareWeibo({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl: shareimg, // 分享图标
        success: function () {
          that.shareModal(that)
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          that.shareModal(that)
          // 用户取消分享后执行的回调函数
        }
      })
    })
  }
  handleBody = (params) => {
    const arr = Object.keys(params)
    const bol = arr.some(v => this.props[v])

    document.body.style.overflow = bol ? 'hidden' : 'initial'
  }
  renderLeaderByMe = (me) => {
    return me ? Object.assign({}, me, {
      avatar: me.headimgurl
    }) : {}
  }
  render() {
    const {teamData, hostId, checkUser, modalSuccess, modalInfo, modalFindTeam, modalMember} = this.props
    const {leader, members} = teamData
    const {hasTeam, joinAble} = checkUser
    // 系统个人信息
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    // 微信个人信息
    const me = localStorage.me ? JSON.parse(localStorage.me) : {}

    let arr = this.handleMember(members)
    // 分享链接
    this.handleWxShare(meByOur.id)

    // 处理body不能滑动
    this.handleBody({
      modalSuccess,
      modalInfo,
      modalFindTeam,
      modalMember
    })
    // 处理弹框
    // this.renderModal()
    // console.log(this.props, 'props')
    const renderLeader = hasTeam ? leader : this.renderLeaderByMe(me)
    // console.log(renderLeader, arr, 'arr---')
    return (
      <div className={styles.page}>
        <img src={index} alt="index" className={styles.img}/>
        <div className={styles.box}>
          <div className={styles.member}>
            {
              renderLeader && (
                <div className={styles.item}>
                  <img src={renderLeader.avatar || avatar} alt="img"/>
                  <div className={styles.name}>{renderLeader.nickname || '合伙人'}</div>
                  <div className={styles.leader}>队长</div>
                  <img className={styles.crown} src={crown} alt="leader"/>
                </div>
              )
            }
            {
              arr && arr.map((v, i) => (
                <div className={styles.item} key={i} onClick={() => this.addMember(v)}>
                  <img src={v.avatar || avatar} alt="img"/>
                  <div className={styles.name}>{v.nickname || '合伙人'}</div>
                </div>
              ))
            }
          </div>
          <div className={styles.num}>{arr.length - (members ? members.length : 0)}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomItem} onClick={() => this.handleModal('modalFindTeam', true)}>
            <img src={btn1} alt="btn1"/>
          </div>
          <div className={styles.bottomItem} onClick={() => this.handleModal('modalInfo', true)}>
            <img src={btn2} alt="btn1"/>
          </div>
        </div>

        {/* 参与成功 modalSuccess*/}
        <div className={`${styles.modal} ${styles.modalSuccess}`} style={{visibility: this.props.modalSuccess ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={success} alt="success"/>
            <div className={styles.btn} onClick={() => this.handleModal('modalSuccess', false)}/>
          </div>
        </div>
        {/* 赚钱攻略 modalInfo*/}
        <div className={`${styles.modal} ${styles.modalInfo}`} style={{visibility: this.props.modalInfo ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={info} alt="info"/>
            <div className={styles.btn} onClick={() => this.handleModal('modalInfo', false)}/>
          </div>
        </div>

        {/* 分享 modalFindTeam */}
        <div className={`${styles.modal} ${styles.modalFindTeam}`} style={{visibility: this.props.modalFindTeam ? 'visible' : 'hidden'}}>
          <img src={findTeam} alt="modalFindTeam"/>
          <div className={styles.close} onClick={() => this.handleModal('modalFindTeam', false)}/>
        </div>

        {/* 只能一次队员 modalMember */}
        <div className={`${styles.modal} ${FineStyle.modalMember}`} style={{visibility: this.props.modalMember ? 'visible' : 'hidden'}}>
          <div className={FineStyle.imgWrap}>
            <img src={member} alt="modalMember"/>
            <div className={FineStyle.btn} onClick={() => this.handleModal('modalMember', false)}/>
          </div>
        </div>
      </div>
    );
  }
}

Like.propTypes = {};

const mapStateToProps = state => {
  return {
    modalSuccess: state.like.modalSuccess,
    modalInfo: state.like.modalInfo,
    modalFindTeam: state.like.modalFindTeam,
    modalMember: state.like.modalMember,

    teamData: state.like.teamData,
    hostId: state.like.hostId,
    checkUser: state.like.checkUser,
  };
};

export default connect(mapStateToProps)(Like);
