import { Component } from 'react';
import { connect } from 'dva';
import styles from './BigPage.scss';
import moment from 'moment';

let companys = {
  youzhengguonei: '邮政包裹/平邮',
  ems: 'EMS',
  shunfeng: '顺丰',
  shentong: '申通',
  yuantong: '圆通',
  zhongtong: '中通',
  huitongkuaidi: '百世汇通',
  yunda: '韵达'
};
class BigPage extends Component {

  componentWillMount() {
    let { params } = this.props;
    if(!params) params = {};
    let { recordId } = params;

    if (recordId) {
      this.props.dispatch({
        type: 'award/getExpress',
        payload: { id: recordId }
      });
    }
  }

  returnIcon(state) {
    switch (state) {
      case 1:
        return styles.itemIcon2;
      case 2:
        return styles.itemIcon3;
      case 3:
        return styles.itemIcon4;
      case 4:
        return styles.itemIcon5;
      default:
        return styles.itemDarkIcon;
    }
  }

  returnNewStatus(state) {
    switch (state) {
      case 1:
        return '已揽件';
      case 2:
        return '运输中';
      case 3:
        return '派件中';
      case 4:
        return '已签收';
      case 5:
        return '疑难';
      case 6:
        return '退签';
      case 7:
        return '退回';
      default:
        return '暂无结果';
    }
  }

  render() {
    const { express={},address } = this.props;
    let steps = [];
    let state, date, company, no;
let orderOne = false;
    if (
      express &&
      express.logistics &&
      express.logistics.details &&
      express.logistics.details.length > 0
    ) {
      steps = express.logistics.details;
      state = express.logistics.state;
      company = express.logistics.company;
      no = express.logistics.no;
      date = steps[steps.length - 1].AcceptTime;
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.top}><span className={styles.topName}>{express.record&&express.record.prizeName}</span></div>
        <div className={styles.main}>
          <div style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.23)' }}>
            <div className={styles.title}>
              <img src={express.record&&express.record.prizePicture} />
              <div className={styles.titleText}>
                <span className={styles.newState}>
                  {this.returnNewStatus(state)}
                </span>
                <span
                  className={styles.newDate}
                  style={state === 4 ? {} : { display: 'none' }}
                >
                  {steps[0] &&
                    `签收时间为${moment(steps[0].AcceptTime).format(
                      'MM月DD日'
                    )}`}
                </span>
              </div>
            </div>
            {company &&
              no && (
                <div className={styles.number}>
                  <span>{companys[company]}</span>
                  <span style={{ marginLeft: '3vw' }}>{no}</span>
                </div>
              )}
          </div>
          <div className={styles.list}>
            <div>
              {address && (
                  <div className={styles.item}>
                    <span
                      className={styles.itemIcon}
                      style={state === 4 ? {} : { backgroundColor: '#C5C5C5' }}
                    >
                      收
                    </span>
                    <div className={styles.itemMain}>
                      <p>
                        [收货地址] {address.provinceName}
                        {address.cityName}
                        {address.districtName}
                        {address.detailInfo}
                      </p>
                    </div>
                  </div>
                )}
              {steps.map((s, i) => (
                <div key={i} className={styles.item}>
                  <span
                    className={
                      i === 0 ? this.returnIcon(state) : styles.itemDarkIcon
                    }
                  />
                  <div className={styles.itemDate}>
                    <span className={styles.itemDay}>
                      {moment(s.AcceptTime).format('MM-DD')}
                    </span>
                    <span className={styles.itemTime}>
                      {moment(s.AcceptTime).format('HH:mm')}
                    </span>
                  </div>
                  <div className={styles.itemMain}>
                    {i === 0 && <h3>{this.returnNewStatus(state)}</h3>}
                    <p>{s.AcceptStation}</p>
                  </div>
                </div>
              ))}
              {date && (
                <div className={styles.item}>
                  <span
                    className={
                      steps.length === 0
                        ? styles.itemIcon1
                        : styles.itemDarkIcon1
                    }
                  />
                  <div className={styles.itemDate}>
                    <span className={styles.itemDay}>
                      {moment(date).format('MM-DD')}
                    </span>
                    <span className={styles.itemTime}>
                      {moment(date).format('HH:mm')}
                    </span>
                  </div>
                  <div className={styles.itemMain}>
                    <h3>已发货</h3>
                    <p>卖家发货</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    express: state.award.express,
    address: state.award.address
  };
};

export default connect(mapStateToProps)(BigPage);
