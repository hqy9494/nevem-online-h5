import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon } from 'antd-mobile'
import styles from './ModalPkSuccess.scss'
import pkSuccess from '../../../assets/Img/crystal/pkSuccess.png'
import moment from 'moment'
import avatar from '../../../assets/Img/crystal/avatar.png'

class modalPkSuccess extends Component {
  // fixName = () => {
  //   return `modalPkSuccess:${moment().format('YYYY-MM-DD')}`
  // }
  render() {
    const { YdayReward, isModal } = this.props
    return (
    <div className={`${styles.modal} ${styles.modalPkSuccess}`} style={{visibility: isModal ? 'visible' : 'hidden'}}>
      <div className={styles.imgWrap}>
        <img src={pkSuccess} alt="pkSuccess"/>
        <div className={styles.sum}>{YdayReward.crystal || 0}水晶</div>
        <div className={styles.list}>
          {
            YdayReward.leader && <div className={styles.item}>
              <div className={styles.itemLeft}>
                <img src={YdayReward.leader.avatar || avatar} alt="img"/>
              </div>
              <div className={styles.itemCenter}>
                <div className={styles.itemCenterName}>{YdayReward.leader.nickname || '合伙人'}</div>
                <div className={styles.itemCenterSub}>队长额外提成</div>
              </div>
              <div className={styles.itemRight}>
                <div className={styles.itemRightNum}>+{YdayReward.crystal / 5}水晶</div>
                <div className={styles.itemRightSub}>+{YdayReward.crystal / 5}水晶</div>
              </div>
            </div>
          }
          {
            YdayReward.members && YdayReward.members.map((v, i) => (
              <div className={styles.item} key={i}>
                <div className={styles.itemLeft}>
                  <img src={v.avatar || avatar} alt="img"/>
                </div>
                <div className={styles.itemCenter}>
                  <div className={styles.itemCenterName}>{v.nickname || '合伙人'}</div>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.itemRightNum}>+{YdayReward.crystal / 5}水晶</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className={`${styles.modalPkSuccessBtn} ${styles.modalPkSuccessBtn1}`} onClick={() => {
          localStorage[`modalPkSuccess:${moment().format('YYYY-MM-DD')}`] = 1
          localStorage.me && this.props.history.replace(`/like?hostId=${localStorage.me.id}`)
        }}/>
        <div className={`${styles.modalPkSuccessBtn} ${styles.modalPkSuccessBtn2}`} onClick={() => {
          localStorage[`modalPkSuccess:${moment().format('YYYY-MM-DD')}`] = 1
          this.props.history.replace('/game')
        }}/>
      </div>
    </div>
    )
  }
}

modalPkSuccess.propTypes = {}

export default modalPkSuccess
