import { Component } from 'react';
import { connect } from 'dva';
import styles from './StorePage.scss';

class StorePage extends Component {
  toStoreDetail = (v) => {
    this.props.history.push(`/award/storeDetail/${v.id}`)
  }
  render() {
    const {storeData} = this.props

    return (
      <div className={styles.wrap}>
        <div className={styles.top} />
        <ul className={styles.couponShopList}>
          {
            storeData && storeData.map((v, i) => (
              <li key={i} onClick={() => this.toStoreDetail(v)}>
                <div className={styles.couponShopItem}>
                  <div className={styles.couponShopItemImg}>
                    <img src={v.mainImage} alt="img"/>
                  </div>
                  <div className={styles.couponShopItemWrap}>
                    <div className={styles.couponShopItemTitle}>
                      {v.title}
                    </div>
                    <p className={styles.couponShopItemDesc}>
                      {v.description}
                    </p>
                    <div className={styles.couponShopItemPrice}>
                      <span>
                        <span className={styles.couponShopItemLabel}>券后价</span>
                        <span className={styles.couponShopItemValue}>¥{v.price - v.value}</span>
                      </span>
                      <span style={{ marginLeft: '2vw' }}>
                        <span className={styles.couponShopItemLabel} style={{background: '#C5C5C5'}}>原价</span>
                        <span
                          className={styles.couponShopItemValue}
                          style={{ color: '#666', textDecoration: 'line-through' }}
                        >
                          ¥{v.price}
                        </span>
                      </span>
                    </div>
                    <div className={styles.couponShopItemCoupon}>
                      <div className={`${styles.couponShopItemCouponLeft}`}>
                        <span>¥</span>
                        <span className={styles.couponShopItemCouponValue}>{v.value}</span>
                        <span>优惠券</span>
                      </div>
                      <div className={styles.couponShopItemCouponRight}>
                        <span>立即</span>
                        <span>领取</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeData: state.store.storeData
  }
}

export default connect(mapStateToProps)(StorePage);
