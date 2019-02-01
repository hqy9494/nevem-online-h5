import { Component } from 'react';
import { connect } from 'dva';
import styles from './DetailPage.scss';
import Clipboard from 'clipboard'
import { Toast } from "antd-mobile"

import help from '../../assets/Img/myCouponDetail-help.png';

class DetailPage extends Component {
  render() {
    const {detail} = this.props

    const clipboard = new Clipboard('.copy', {
      text: function(trigger) {
        return detail.tkl;
      }
    })
    clipboard.on('success', function(e) {
      Toast.info('复制成功', 1)
    })
    clipboard.on('error', function(e) {
      Toast.info('复制失败', 1)
    })

    return (
      <div className={styles.myCouponDetailPage}>
        <div className={styles.myCouponDetailHeader}>
          <img src={detail.mainImage} />
        </div>
        <div className={styles.myCouponDetailMain}>
          <div className={`${styles.myCouponDetailCoupon} copy`}>
            <div className={styles.myCouponDetailCouponShadowLeft} />
            <div className={styles.myCouponDetailCouponShadowRight} />
            <div className={styles.myCouponDetailCouponLeft}>
              <div className={styles.myCouponDetailCouponValue}>¥{detail.value}</div>
              <div className={styles.myCouponDetailCouponText}>优惠券</div>
            </div>
            <div className={styles.myCouponDetailCouponRight}>
              {/*<div className={styles.myCouponDetailCouponDesc}>*/}
                {/*满199元可用*/}
              {/*</div>*/}
              <a
                href="javascript:;"
                className={styles.myCouponDetailCouponBtn}
              >
                立即使用
              </a>
            </div>
          </div>
          <div className={styles.myCouponDetailTitle}>
            {detail.title}
          </div>
          <div className={styles.myCouponDetailPrice}>
            <span className={styles.myCouponDetailPrice1}>¥{detail.price - detail.value}</span>
            <span className={styles.myCouponDetailPrice2}>¥{detail.price}</span>
            <span className={styles.myCouponDetailPriceIcon}>特价</span>
          </div>
          <div className={styles.myCouponDetailDesc}>
            {detail.description}
          </div>
          <div className={styles.myCouponDetailHelp}>
            <img src={help} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    detail: state.detail.detail
  }
}

export default connect(mapStateToProps)(DetailPage);
