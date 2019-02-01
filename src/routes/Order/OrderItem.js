import PropTypes from 'prop-types';
import styles from './orderItem.scss';
import moment from 'moment';

const orderItem = ({ data={}, product, history }) => {
  return (
    <div className={styles.item}>
      <div className={styles.section1}>
        <span className={styles.orderNum}>
          订单号：{data.no}
        </span>
        <span className={styles.state}>
          {(() => {
            // WAIT_PAY-未付款 PAID-已付款(待发货) WAIT_REFUND-等待退款 REFUND-已退款 SEND-已发货 RECEIVED-已签收 CLOSED-订单关闭

            if (data.status === 'WAIT_PAY') {
              return '未付款';
            } else if (data.status === 'PAID') {
              return '已付款(待发货)';
            } else if (data.status === 'WAIT_REFUND') {
              return '等待退款';
            } else if (data.status === 'REFUND') {
              return '已退款';
            } else if (data.status === 'SEND' || data.status === 'LOGISTIC_CANCEL') {
              return '已发货';
            } else if (data.status === 'RECEIVED') {
              return '已签收';
            } else if (data.status === 'CLOSED') {
              return '订单关闭';
            }
          })()}
        </span>
      </div>
      <div className={styles.section2}>
        <img src={product ? product.mainImg : ''} />
        <div>
          <span className={styles.name}>{product && product.name}</span>
          <span className={styles.slot}>{data.productNo}号盒子</span>
          <span className={styles.price}>
          <small>￥</small>{data.price ? (data.price / 100).toFixed(2) : 0}
          </span>
        </div>
        <span className={styles.number}>x{data.total}</span>
      </div>
      <div className={styles.section3}>
        <span className={styles.date}>{data.createdAt && moment(data.createdAt).format('YYYY-MM-DD HH:mm')}</span>
        <span className={styles.total}>
          共{data.total}件 实付金额：<small>￥</small>
          {data.totalFee ? (data.totalFee / 100).toFixed(2) : 0}
        </span>
      </div>
      <div className={styles.section4}>
        <a
          className={styles.btn}
          style={data.expressNo?{ marginRight: '3vw' }:{}}
          onClick={() => {
            history && history.push('/home');
          }}
        >
          再次购买
        </a>
        <a
          className={styles.btn}
          onClick={() => {
            history &&
              data.id &&
              history.push(`/order/express/${data.id}`);
          }}
          style={{display:data.expressNo?"inline-block":"none"}}
        >
          查看物流
        </a>
      </div>
    </div>
  );
};

orderItem.defaultProps = {
  data: {}
};

orderItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number,
    total: PropTypes.number,
    totalFee: PropTypes.number,
    expressNo: PropTypes.string,
    createdAt: PropTypes.string,
    status: PropTypes.string
  }).isRequired
};

export default orderItem;
