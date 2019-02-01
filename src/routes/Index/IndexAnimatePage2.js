import {Component} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import styles from './IndexAnimatePage2.scss'
import b from '../../assets/Img/animate/box.png'
import circle from '../../assets/Img/animate/circle.png'
import buyinfo from '../../assets/Img/animate/buyinfo.png'
import terminalAfter from '../../assets/Img/animate/terminalAfter.png'
import bac from '../../assets/Img/animate/bac.png'
import terminalBefore from '../../assets/Img/animate/terminalBefore.png'
import tel from '../../assets/Img/animate/tel.png'
import need from '../../assets/Img/animate/need.png'
import toLike from '../../assets/Img/animate/toLike.png'
import {Modal} from 'antd-mobile'
import moment from 'moment'

class IndexAnimatePage2 extends Component {
  state = {
    modal: false,
    isClick: true,
    soldout: false,
    isInfoModal: false
  }
  handleModal = () => {
    this.setState({
      modal: true
    })
  }
  handleClose = () => {
    this.setState({
      modal: false
    })
  }
  pxToVw = (v) => {
    const baseFontSize = 7.5

    return v / baseFontSize + 'vw'
  }
  pxToVh = (v) => {
    const baseFontSize = 13.34

    return v / baseFontSize + 'vh'
  }
  handleClickItem = item => {
    if (item.isDown) return

    this.setState({
      isClick: false
    }, () => {
      this.props.dispatch({
        type: 'indexAnimate/changeBox',
        payload: {
          ...item,
          isDown: true
        }
      })
    })

    this.time = setTimeout(() => {
      this.props.history.push(`/buy/${item.title}`)
    }, 2000)
  }
	//..
  componentWillUnmount() {
    clearTimeout(this.time)
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }
  onOpen = key => {
    this.setState({
      [key]: true,
    })
  }
  toAward = () => {
    this.props.history.push(`/game`)
  }
  toTop = () => {
    window.scrollTo(0, 0)
  }
  toActive = () => {
    if (localStorage.token) window.location.href = `https://lkd.yooyuu.com.cn/static/nevemActivity/dist/index.html?token=${localStorage.token}`
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
        str = this.combindUrlParam(Object.assign({}, param, {
          teamId: teamData.id
        }))
        this.props.history.to(`/like/fine${str}`)
      } else{
        this.props.history.to(`/like${str}`)
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
  render() {
    const {box, setting} = this.props
    const {isClick} = this.state
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}

    const bottom = 220
    const numHeight = 20
    const boxWidth = 103
    const boxHeight = 142
    const itemHeight = 190
    const itemWidth = 160
    const itemTime = 0.95
    const itemLeft = 40
    const allRow = Math.floor(box.length / 3)

    let isClose = setting.open || false
    // console.log(setting)

    if (setting.judgeDay && setting.todayBuyCount && setting.dayBuyLimit){
      if (moment(setting.judgeDay).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
        isClose = setting.todayBuyCount < setting.dayBuyLimit ? true : false
      }
    }

    return (
      <div className={styles.page}>
        <div className={styles.wrap}>
          <img src={bac} alt="bac" className={styles.bac}/>
          <div className={styles.terminalAfter}>
            <img src={terminalAfter} alt="terminalAfter" className={styles.terminalAfter}/>
            <div className={styles.box}>
              {
                box && box.map((v, i) => (
                  <img
                    src={b}
                    alt="box"
                    className={classnames({
                      [styles.item]: true,
                      [(() => {
                        switch (v.col) {
                          case 1:
                            return styles[`item1Animate${v.row}`]
                          case 2:
                            return styles[`item2Animate${v.row}`]
                          case 3:
                            return styles[`item3Animate${v.row}`]
                        }
                      })()]: v.isDown
                    })}
                    key={i}
                    style={{
                      bottom: this.pxToVh((allRow - v.row) * itemHeight + numHeight + bottom),
                      left: this.pxToVh((v.col - 1) * itemWidth + itemLeft),
                      width: this.pxToVh(boxWidth * itemTime),
                      height: this.pxToVh(boxHeight * itemTime)
                    }}
                  />
                ))
              }
              {
                box && box.map((v, i) => (
                  <div
                    className={styles.itemWrap}
                    // onClick={() => this.handleClickItem(v)}
                    key={i}
                    style={{
                      bottom: this.pxToVh((allRow - v.row) * itemHeight + numHeight + bottom - 10),
                      left: this.pxToVh((v.col - 1) * itemWidth + itemLeft),
                      width: this.pxToVh(boxWidth * itemTime),
                      height: this.pxToVh((boxHeight + 18) * itemTime)
                    }}
                  >
                    <img
                      src={circle}
                      alt="circle"
                      className={classnames({
                        [styles.circle]: true,
                        [styles.circleAnimate]: v.isDown
                      })}
                      style={{
                        width: this.pxToVh(66 * itemTime),
                        height: this.pxToVh(68 * itemTime)
                      }}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className={styles.terminalAfter}>
            <img src={terminalBefore} alt="terminalBefore"/>
            <div className={styles.box}>
              {
                box && box.map((v, i) => (
                  <div
                    className={styles.itemWrap}
                    onClick={() => isClick && this.handleClickItem(v)}
                    key={i}
                    style={{
                      bottom: this.pxToVh((allRow - v.row) * itemHeight + numHeight + bottom - 10),
                      left: this.pxToVh((v.col - 1) * itemWidth + itemLeft),
                      width: this.pxToVh(boxWidth * itemTime),
                      height: this.pxToVh((boxHeight + 18) * itemTime)
                    }}
                  />
                ))
              }
            </div>
          </div>
          <img src={buyinfo} alt="buyinfo" className={styles.buyinfo} onClick={this.handleModal}/>
          <img src={need} alt="buyinfo" className={styles.need} onClick={() => this.onOpen('isInfoModal')}/>
          {
            <a href="tel:4009939138" className={styles.tel}>
              <img src={tel} alt="tel"/>
            </a>
          }
          {
            // meByOur && <div className={styles.toLike} onClick={() => this.toLike()}>
            //   <img src={toLike} alt="toLike"/>
            // </div>
          }
        </div>
        <div className={styles.modal} onClick={this.handleClose} style={{display: this.state.modal ? 'block' : 'none'}}>
          <div
            className={styles.tip}
            onClick={e => {
              e.stopPropagation()
              return
            }}
          >
            <span className={styles.modalClose} onClick={this.handleClose}/>
          </div>
        </div>
        <div className={styles.modal} style={{display: !isClose ? 'block' : 'none'}}>
          <div className={styles.soldout}>
            <div className={styles.soldoutTop}>
              <div>每日限购3000盒</div>
              <div><span>明日8:00整</span>开始疯狂抢购</div>
            </div>
            <div className={styles.soldoutBottom}><span>打烊时间推荐免费抽奖福袋</span></div>
            <div className={styles.soldoutBtn} onClick={this.toActive}>心愿福袋</div>
          </div>
        </div>
        <Modal
          visible={this.state.isInfoModal}
          transparent
          onClose={this.onClose('isInfoModal')}
          title="购买须知"
        >
          <div className={styles.modalInfo}>
          	<div>心愿先生幸运盒子中奖详情</div>
          	<div>在活动时间内，参与者购买线上商城的幸运盒子（以下合称“活动产品”）后，系统将自动发放120水晶，每使用100水晶即可参加1次抽奖，有机会获得奖品。</div>
            <div>一. 活动时间：</div>
            <div> 1. 活动时间：2018年9月21日00:00起至2019年9月14日24:00止。</div>
            <div> 2. 兑奖时间：2018年9月21日00:00起至2019年9月21日24:00止。</div>
            <div> 3. 以上“活动时间”指购买活动产品后参与水晶抽奖活动和实物奖品活动的有效期限；2019年9月14日24:00后，参与者就无法参与水晶抽奖活动和实物奖品活动。</div>
            <div> 4. 除本规则另有约定外，以上“兑奖时间”指参与水晶抽奖活动和实物奖品活动后按活动规则兑换奖品的有效期限；2019年9月21日24:00后，中奖者将无法兑换奖品。</div>
            <div> 5. 本活动中涉及到的所有时间以本活动计算机系统的时间为标准时间。</div>
            <div> 二. 水晶抽奖活动</div>
            <div> 1. 水晶获得方式：</div>
            <div> 1) 参与者通过购买线上商城的幸运盒子获得水晶，一个盒子=120水晶。</div>
            <div> 2.水晶抽奖的方式：</div>
            <div> 1) 用户可在公众号子菜单“个人上中心”—“线上抽奖”页面找到“心愿大翻盘”的入口，点击后即可参与水晶抽奖，每次抽奖消耗100水晶，并且获得1点“幸运值”</div>
            <div> 2) 如参与者微信与公众号无法绑定成功或因系统出错无法抽奖，水晶没有到账或其他不相符的情况，可拨打客服热线：4009939138（周一至周六9:00-18:00，话费自理），由客服人员提供帮助。</div>
            <div> 3) 水晶的获取渠道只能通过官方公众号“心愿先生”发放，如出现通过BUG或者其它非法非正常的渠道获得水晶的话，活动主办方有权冻结该参与者相应账号暂停参与活动，情节严重者将直接起诉。</div>
            <div> 4) 为防止违规兑换，保护参与者合法利益，请参与者保留微信支付记录，以备兑奖查验。</div>
            <div> 2.幸运值：</div>
            <div> 1）用户进行水晶抽奖的时候，会获得幸运值，每1次抽奖即可增加1点幸运值，幸运值越高，获得幸运大奖和30元红包的几率就越高。</div>
            <div> 3.奖品设置</div>
            <div> 1)幸运大奖</div>
            <table border="1" cellSpacing="0" cellPadding="0">
              <thead>
              <tr>
                <th>奖品名称</th>
                <th>价值（人民币/元）</th>
                <th>数量（份）</th>
                <th>中奖率（约）</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>IphoneXS</td>
                <td>8699</td>
                <td>12</td>
                <td>0.0113%</td>
              </tr>
              <tr>
                <td>HOTT浴室防水吸盘蓝牙音箱</td>
                <td>180</td>
                <td>170</td>
                <td>0.113%</td>
              </tr>
              <tr>
                <td>巧克力暖手宝</td>
                <td>180</td>
                <td>170</td>
                <td>0.113%</td>
              </tr>
              <tr>
                <td>小米手环</td>
                <td>170</td>
                <td>170</td>
                <td>0.113%</td>
              </tr>
              <tr>
                <td>mac口红</td>
                <td>170</td>
                <td>170</td>
                <td>0.113%</td>
              </tr>
              <tr>
                <td>复古音箱</td>
                <td>90</td>
                <td>170</td>
                <td>0.113%</td>
              </tr>
              <tr>
                <td>欧诗达烤箱</td>
                <td>90</td>
                <td>170</td>
                <td>0.113%</td>
              </tr>
              </tbody>
            </table>
            <div> 2）红包奖</div>
            <table border="1" cellSpacing="0" cellPadding="0">
              <thead>
              <tr>
                <th>奖品名称</th>
                <th>价值（人民币/元）</th>
                <th>数量（份）</th>
                <th>中奖率（约）</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>30元红包</td>
                <td>30</td>
                <td>5000</td>
                <td>3.33%</td>
              </tr>
              <tr>
                <td>10元红包</td>
                <td>10</td>
                <td>10000</td>
                <td>6.67%</td>
              </tr>
              <tr>
                <td>5元红包</td>
                <td>5</td>
                <td>25000</td>
                <td>16.67%</td>
              </tr>
              </tbody>
            </table>
            <div> 3）淘宝优惠券</div>
            <table border="1" cellSpacing="0" cellPadding="0">
              <thead>
              <tr>
                <th>奖品名称</th>
                <th>价值（人民币/元）</th>
                <th>数量（份）</th>
                <th>中奖率（约）</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>100块淘宝优惠券</td>
                <td>100</td>
                <td>36250</td>
                <td>24%</td>
              </tr>
              <tr>
                <td>50块淘宝优惠券</td>
                <td>50</td>
                <td>36250</td>
                <td>24%</td>
              </tr>
              <tr>
                <td>30块淘宝优惠券</td>
                <td>30</td>
                <td>36250</td>
                <td>24%</td>
              </tr>
              </tbody>
            </table>
            <div> 各级奖单独获得。</div>
            <div> 上述奖品总价值7197483元，最高奖价值8699元，综合中奖率约99.36%， 部分奖品数量有限，先到先得。</div>
            <div> 3. 兑奖说明：</div>
            <div> 1) 幸运大奖相关奖品</div>
            <div> 幸运大奖的相关奖品通过快递的形式发放给中奖者。</div>
            <div> a）在中奖者正确提交个人信息后，主办方在2个工作日内发货，物流时间约在7个工作日内（新疆、西藏等除外），具体物流时间请以实际情况为准。</div>
            <div> b) 如幸运大奖相关奖品在兑换、使用过程中有任何问题，请直接致电心愿先生VIP客服专线：400-993-9138。</div>
            <div> c) 幸运大奖中奖兑换期限为活动截止后一个月，请中奖者在前述期限内使用幸运大奖</div>
            <div> d) 活动主办方有权要求实物类奖品中奖者提供更多个人身份信息（包含但不限于签名档身份证正反面复印件等信息）以验证中奖者身份或办理相关手续；如因所提供手机号码不准确（包含但不限于空号、停机等其他情况）而造成无法联络到中奖者导致不能兑换奖品，视为中奖者放弃中奖资格及由此产生的权利，损失由中奖者自行承担。</div>
            <div> e) 中奖地址与活动账号进行唯一绑定，一经提交则在活动时间内均不得修改。如由于中奖者提供的手机号码无法取得联系（包含但不限于空号、停机、无法接通等情况）或地址错误，逾期填写领奖信息或收货信息或由于中奖者任何过失而造成奖品未能成功发放，则视为中奖者自动放弃该奖品，活动主办方在法律许可的范围内不承担任何责任。奖品兑换时间截止到2019年10月21日24:00止，逾期视为中奖者放弃中奖资格及由此产生的权利。中奖者须确保向活动网站页面或相关工作人员提供的个人信息准确无误，如因兑奖时提供的兑奖凭证与登记资料不符，无法兑换奖品，损失将由中奖者自行承担。</div>
            <div> f) 活动主办方承诺参与者提交的个人信息只用于本活动相关的奖品派发，不作他用。</div>
            <div> g) 由于灯光、拍摄角度、显示器偏差、个人的理解的不同等原因，导致奖品照片与实物可能会存在一些差异，中奖者获得的奖品颜色、尺码、材质和功能等，以最终实物为准。</div>
            <div> h) 以上奖品不可找零，不得转让，不能兑换现金，不开具发票。</div>
            <div> 2）红包奖相关奖品</div>
            <div> a) 红包奖相关奖品将以微信红包的形式发放给中奖者；</div>
            <div> b) 手机端兑换步骤：</div>
            <div> 第一步，手机端打开微信，进入公众号内。若没有关注公众号，请先微信搜索关注心愿先生；</div>
            <div> 第二步，关注成功后，即可收到由公众号发给用户的红包，红包金额与客户扫码抽奖后所中金额对等；</div>
            <div> 第三步，用户点击红包领取后，即兑换成功，所领红包款项将直接到中奖者的用户个人微信钱包内，用户可在微信钱包查询。</div>
            <div> c) 如红包奖在兑换、使用过程中有任何问题，请直接致电心愿先生VIP客服专线：400-993-9138。</div>
            <div> d) 红包中奖领取期限为公众后发送所中奖红包后一天，请中奖者在前述期限内领取红包奖。</div>
            <div> 3）淘宝优惠券奖相关奖品</div>
            <div> a) 淘宝优惠券奖相关奖品将以淘宝优惠券的形式发放给中奖者；</div>
            <div> b) 手机端兑换步骤：</div>
            <div> 第一步，手机端打开微信，进入公众号内，点击个人中心，点击中奖纪录。若没有关注公众号，请先微信搜索关注心愿先生；</div>
            <div> 第二步，在中奖纪录内点击优惠券中奖信息，进入“优惠券商城”，用户挑选心仪产品后点击“立即领取”，跳转到所选产品界面，点击“立即使用”即兑换成功；</div>
            <div> c) 如淘宝优惠券奖在兑换、使用过程中有任何问题，请直接致电心愿先生VIP客服专线：400-993-9138。</div>
            <div> d) 淘宝优惠券奖中奖兑换期限为活动截止后一个月，请中奖者在前述期限内使用淘宝优惠券奖。</div>
            <div> 四. 咨询热线：</div>
            <div> 活动时间和兑奖时间内，活动参与者有任何咨询、建议或投诉都可在每周一至周五9时至17时拨打客服400热线号码：4009939138（话费自理），与活动客服人员进行沟通协商。</div>
            <div> 五. 活动主办单位：</div>
            <div> 本次活动由以下公司主办（称为“活动主办方”）：</div>
            <div> 1. 广州摘星者信息科技有限公司</div>
            <div> 六. 个人信息收集及保护：</div>
            <div> 1. 您同意：</div>
            <div> 1) 当您参与本活动视为同意本活动规则或将自己的个人信息或自己的姓名、地址、账号、微信号、电话号码等递交给活动公众号，就表明您已接受并同意活动主办方按本活动规则约定收集、使用您的个人信息。</div>
            <div> 2) 您同意本活动规则或将自己的个人信息递交给活动公众号是您继续参与本活动的前提。您享有拒绝的权利，若您选择点击不提交您的个人信息，则表明您自动退出本活动，放弃您在本活动中享有的一切权利（如有），感谢您的参与。
            </div>
            <div> 2. 收集及使用个人信息的目的：</div>
            <div> 1) 为了识别每位参与者/中奖者；</div>
            <div> 2) 用于兑奖，确保能正确告知兑奖信息并依据正确的信息发放奖品；</div>
            <div> 3) 传达与活动有关的公告事项和针对性的信息；</div>
            <div> 4) 防止不良参与者使用不正当的手段参加活动；</div>
            <div> 5) 提供其他与活动相关的优质服务。</div>
            <div> 3. 您特此明确知晓并同意：活动主办方可向您发送中奖通知、兑奖通知等与活动相关的商业信息。如您的个人信息有更新，请您及时告知活动主办方。如因您提供的个人信息不实或不准确，给您自身造成任何性质的损失，均由您自行承担。
            </div>
            <div> 4. 收集及使用个人信息的方式：根据公众号提示进行相关授权，提供的信息将被用于中奖核实及奖品发放目的，同时您也同意活动主办方通过第三方平台查询并获取您电话号码的归属地信息，参与本活动即视为知悉并同意该等收集及使用。
            </div>
            <div> 5. 活动主办方将严格依据上述收集及使用个人信息的目的，以必须、必要的方式收集、使用个人信息。</div>
            <div> 6. 收集及使用个人信息的范围</div>
            <div> 1) 参与者将提供：真实有效的手机号码、微信个人信息（头像、昵称、地区等），实物类奖品中奖者还将额外提供：真实姓名、邮寄地址等能够单独或者与其他信息结合识别中奖者并邮寄相关实物类奖品的信息。</div>
            <div> 2) 不满18周岁的参与者，需要法定监护人的信息：法定监护人的姓名、联络地址、手机号码、邮箱地址。</div>
            <div> 7. 活动主办方承诺，活动主办方仅在获得参与者同意时，收集参与者的个人信息，绝不会违反法律、法规的规定和双方的约定收集、使用信息。除本活动规则另有约定外，活动主办方及其工作人员对收集的参与者个人信息将严格保密，不得泄露、出售或者非法向他人提供，但由于政府要求、法律政策需要等原因除外。活动主办方将采取技术措施和其他必要措施，确保信息安全，防止参与者个人信息泄露、丢失。在发生或者可能发生信息泄露、丢失的情况时，应当立即采取补救措施。</div>
            <div> 8. 您特此明确知晓并同意：为顺利执行本活动，您同意活动主办方可以将您提供的个人信息提供给活动合作方，包括将活动主办方通过第三方平台获取您电话号码的归属地信息提供给活动合作方，活动合作方将严格依据本活动规则收集、使用个人信息，并进行保密，包括但不限于如下情形：</div>
            <div> 1) 在兑奖时，向送货公司提供送货所必须的最基本中奖者个人信息；</div>
            <div> 2) 为了使参与者顺利参与活动而必须、无法避免的技术原因，而向活动合作方提供所必须的个人信息。</div>
            <div> 七. 活动声明及注意事项</div>
            <div> 1. 除活动规则明确说明由活动主办方承担的费用，其他因参与活动发生的上网费、活动咨询或投诉的电话费，或为使用奖品而发生的交通费、食宿费等费用由参与者自行承担。</div>
            <div> 2. 参与者同意并遵守本活动页面上的所有活动相关规则及相关法律，包括但不限于注册协议（如有）、官方使用条款及隐私条款并履行相应的义务。</div>
            <div> 3. 参与者条件：无职业、性别限制，具有完全民事行为能力者均可参加。未满18周岁的未成年人，须在事先征得其法定监护人的同意后，方可参加本活动。</div>
            <div> 4. 如发现有参与者在活动中使用任何不正当的手段参加活动，活动主办方有权在不事先通知的前提下取消其参加活动的资格。</div>
            <div> 5. 如遇不可抗力因素，活动主办方拥有取消本次活动的权利。</div>
            <div> 6. 本活动中的参与行为须合法健康，不涉及反动、色情、暴力、低俗以及有违本次活动主题的内容。一经发现违反规定，活动主办方有权立即取消其参与资格，并要求其承担相关法律责任。参与者应就参与行为、言论等独立承担责任，其任何行为及言论不代表活动主办方立场或意见，或构成活动主办方行为。</div>
            <div> 7. 中奖者需提供真实且准确无误的兑奖信息（包括但不限于手机号、地址等，或应活动主办方要求提供的真实姓名、身份证号码），如果中奖者逾期提供、不提供或提供不正确的兑奖信息导致无法兑奖、无法确认或者无法联络的，视为中奖者自动放弃获奖资格及其对应的权利，活动主办方将不作任何形式赔偿也不承担其他责任。参与者提供的个人信息将被用于奖品发放目的，因而须被提供给相关第三方以发送奖品，参与者参与本活动视为其知悉并同意该等用途。</div>
            <div> 8. 活动网站上的奖品图片仅供参考，奖品根据中奖者收到的实物为准。</div>
            <div> 9. 奖品不可兑换为现金或作价销售。奖品的具体内容、规格、质量、外观、使用规则及后续服务适用服务提供商或奖品供应商的标准并由该服务商或供应商负责，因使用各个奖品过程中产生的纠纷，请与服务提供商或奖品供应商解决，活动主办方不承担相应责任。奖品不设退、换服务。</div>
            <div> 10. 如因二维码兑换、奖品使用等过程中导致的纠纷或产生的人身损害和财产损失，由相应的服务提供商或致损方负责。</div>
            <div> 11. 如遇意外，无法提供指定奖品，活动主办方有权以价值相仿的奖品替代；如遇不可抗力因素导致无法兑奖或中奖者无法使用奖品，活动主办方在法律许可范围内不承担相关责任。非由活动主办方故意或重大过失造成中奖者在兑换或使用奖品过程中所发生的事故，活动主办方无须承担相应责任。</div>
            <div> 12. 活动主办方以及相关合作方不对因为网络传输原因而导致获奖信息错误或延误承担任何责任。</div>
            <div> 13. 奖品个人所得税（如有）由中奖者承担，由相关方依法安排代扣代缴。</div>
            <div> 14. 本次活动范围为中国大陆地区（港澳台地区除外）。</div>
            <div> 15. 本活动的相关事宜，可由活动主办方在法律许可范围内进行解释。</div>
          </div>
        </Modal>
      </div>
    )
  }
}


IndexAnimatePage2.propTypes = {}

const mapStateToProps = state => {
  return {
    box: state.indexAnimate.box,
    setting: state.indexAnimate.setting,
  }
}

export default connect(mapStateToProps)(IndexAnimatePage2)
