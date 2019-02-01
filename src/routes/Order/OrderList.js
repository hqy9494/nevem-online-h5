import { Component } from 'react';
import { connect } from 'dva';
import styles from './orderList.scss';
import Nav from '../../components/Common/Nav/Nav';
import { Flex } from 'antd-mobile';

import noAddress from '../../assets/Img/noAddress.png';
import Item from './OrderItem';

const NoData = ({ history }) => (
  <div className={styles.noData}>
    <img src={noAddress} />
    <span>暂无订单</span>
  </div>
);

class OrderList extends Component {
  render() {
    const { name, orderList, product } = this.props;

    return (
      <div className={styles.wrap}>
        <Nav
          title={name}
          history={this.props.history}
          isLeft={true}
          
        />
        {orderList && orderList.length > 0 && 
          orderList.map(a => (
            <Item
              key={a.id}
              data={a}
              product={a.product}
              history={this.props.history}
            />
          ))
          
        }
        {
          orderList && orderList.length === 0 && <NoData history={this.props.history} />
        }
      </div>
    );
  }
}

OrderList.propTypes = {};

const mapStateToProps = state => {
  return {
    orderList: state.order.orderList,
    product: state.box.product
  };
};

export default connect(mapStateToProps)(OrderList);
