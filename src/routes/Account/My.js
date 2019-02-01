import { Component } from 'react';
import { connect } from 'dva';
import styles from './my.scss';
import Nav from '../../components/Common/Nav/Nav';
import { Flex } from 'antd-mobile';
import common from '../../common/common';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
    this.to1 = this.toUrl.bind(this, '/indexHome');
    this.to2 = this.toUrl.bind(this, '/order');
    this.to3 = this.toUrl.bind(this, '/address');
    this.to4 = this.toUrl.bind(this, '/award');
    this.to5 = this.toUrl.bind(this, '/game');
  }

  componentWillMount() {
    let openId = this.getParameterByName('openId');
    if (openId) {
      this.props.dispatch({
        type: 'account/openIdGetMe',
        payload: { openId }
      });
    }
  }

  toUrl(url) {
    url && this.props.history.push(url);
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  render() {
    let { name, me } = this.props;
    if (localStorage.me) {
      me = JSON.parse(localStorage.me);
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <div className={styles.title}>
            <img src={me.headimgurl} />
            <span>{me.nickname}</span>
          </div>
          <ul className={styles.options}>
            <li onClick={this.to1}>
              <span className={styles.icon1} />
              <span className={styles.text}>立即购买</span>
              <span className={styles.arrow} />
            </li>
            <li onClick={this.to5}>
              <span className={styles.icon5} />
              <span className={styles.text}>线上抽奖</span>
              <span className={styles.arrow} />
            </li>
            <li onClick={this.to2}>
              <span className={styles.icon2} />
              <span className={styles.text}>全部订单</span>
              <span className={styles.arrow} />
            </li>
            <li
              onClick={() => {
                this.props
                  .dispatch({
                    type: 'account/getEquipmentToken'
                  })
                  .then(res => {
                    window.location.href = `${
                      common.baseEquipmentURL
                    }/static/wechat/${common.www}/myNewAddress.html?token=${res.id}`;
                  });
              }}
            >
              <span className={styles.icon3} />
              <span className={styles.text}>我的地址</span>
              <span className={styles.arrow} />
            </li>
            <li
              onClick={() => {
                this.props
                  .dispatch({
                    type: 'account/getEquipmentToken'
                  })
                  .then(res => {
                    window.location.href = `${
                      common.baseEquipmentURL
                    }/static/wechat/${common.www}/myNewRecord.html?token=${res.id}`;
                  });
              }}
            >
              <span className={styles.icon4} />
              <span className={styles.text}>我的奖品</span>
              <span className={styles.arrow} />
            </li>
            <li>
              <span className={styles.icon6} />
              <a href="tel:4009939138" className={styles.text}>
                联系我们
              </a>
              <span className={styles.arrow} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

My.propTypes = {};

const mapStateToProps = state => {
  return {
    me: state.account.me
  };
};

export default connect(mapStateToProps)(My);
