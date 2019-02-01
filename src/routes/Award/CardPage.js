import { Component } from 'react';
import { connect } from 'dva';
import styles from './CardPage.scss';

class CardPage extends Component {
  toStore = (v) => {
    if (!v.id) return

    this.props.history.push(`/award/store/${v.value}`)
  }
  handleSum = (arr) => {
    return arr.reduce((pre, next) => pre + Number(next.value) || 0, 0)
  }
  render() {
    const { cardData } = this.props
    const sum = this.handleSum(cardData)

    return (
      <div className={styles.wrap}>
        <div className={styles.title}>
          <div className={styles.count}>
            <span>
              <sub>￥</sub>
              {sum}
            </span>
            <p>现金券</p>
          </div>
        </div>
        <div className={styles.list}>
          {
            cardData && cardData.map((v, i) => (
              <div className={styles.item} key={i} onClick={() => this.toStore(v)}>
                <div className={styles.itemLeft}>
              <span>
                <sup>￥</sup>
                {v.value}
              </span>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.itemDesc}>
                    <p>{v.title}</p>
                    <span>指定商品适用</span>
                  </div>
                  <a className={styles.itemBtn}>立即查看</a>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardData: state.card.cardData
  }
}

export default connect(mapStateToProps)(CardPage);
