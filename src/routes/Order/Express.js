import { Component } from "react";
import { connect } from "dva";
import styles from "./express.scss";
import Nav from "../../components/Common/Nav/Nav";
import moment from "moment";

let companys = {
  EMS: "EMS",
  ZJS: "宅急送",
  YTO: "圆通",
  STO: "申通",
  SF: "顺丰",
  YUNDA: "韵达",
  ZTO: "中通",
  FINEEX: "发网",
  FIREWIND: "风火",
  ZJB: "宅急便",
  SURE: "速尔",
  APEX: "全一",
  CCES: "CCES",
  QFKD: "全峰",
  FKD: "飞快达",
  TOPNAME: "特能",
  XCJB: "星辰急便",
  HTKY: "汇通",
  EBON: "一邦快递",
  TTKDEX: "天天快递",
  DBL: "德邦",
  NEDA: "能达",
  UC: "优速",
  GTO: "国通快递",
  LBEX: "龙邦",
  FKD: "飞康达",
  JD: "京东快递",
  POSTB: "邮政小包",
  XBWL: "新邦物流",
  FAST: "快捷快递",
  XNEXPRESS: "虚拟快递公司",
  OTHER: "其他"
};

class Express extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.dispatch({
        type: "order/getExpress",
        payload: { id: this.props.match.params.id }
      });
      this.props.dispatch({
        type: "order/getOrderOne",
        payload: { id: this.props.match.params.id }
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
        return "已揽件";
      case 2:
        return "运输中";
      case 3:
        return "派件中";
      case 4:
        return "已签收";
      case 5:
        return "疑难";
      case 6:
        return "退签";
      case 7:
        return "退回";
      default:
        return "暂无结果";
    }
  }

  // <div className={styles.item}>
  //   <span className={styles.itemIcon}>收</span>
  //   <div className={styles.itemMain}>
  //     <p>
  //       [收货地址] 广东省广州市天河区 天河路 羊城花园小区 A座 1689
  //     </p>
  //   </div>
  // </div>
  // <div className={styles.item}>
  //   <span className={styles.itemIcon} />
  //   <div className={styles.itemDate}>
  //     <span className={styles.itemDay}>05-12</span>
  //     <span className={styles.itemTime}>18:23</span>
  //   </div>
  //   <div className={styles.itemMain}>
  //     <h3>已签收</h3>
  //     <p>快件已被，已签收</p>
  //   </div>
  // </div>
  // <div className={styles.item}>
  //   <span className={styles.itemIcon} />
  //   <div className={styles.itemDate}>
  //     <span className={styles.itemDay}>05-12</span>
  //     <span className={styles.itemTime}>18:23</span>
  //   </div>
  //   <div className={styles.itemMain}>
  //     <h3>派件中</h3>
  //     <p>
  //       [广州市] 广东省广州市天河区东圃公司派件员：刘福龙
  //       <span style={{ color: '#DA1A10' }}>17890987878</span>
  //       正在为您派件
  //     </p>
  //   </div>
  // </div>
  // <div className={styles.item}>
  //   <span className={styles.itemIcon} />
  //   <div className={styles.itemDate}>
  //     <span className={styles.itemDay}>05-12</span>
  //     <span className={styles.itemTime}>18:23</span>
  //   </div>
  //   <div className={styles.itemMain}>
  //     <h3>运输中</h3>
  //     <p>
  //       从广东广州分拨中心出发，本次转运目的地：广州天河棠下 分拨点
  //     </p>
  //   </div>
  // </div>
  // <div className={styles.item}>
  //   <span className={styles.itemIcon} />
  //   <div className={styles.itemDate}>
  //     <span className={styles.itemDay}>05-12</span>
  //     <span className={styles.itemTime}>18:23</span>
  //   </div>
  //   <div className={styles.itemMain}>
  //     <p>在分拨中心广州分拨中心进行卸车扫描</p>
  //   </div>
  // </div>
  // <div className={styles.item}>
  //   <span className={styles.itemIcon} />
  //   <div className={styles.itemDate}>
  //     <span className={styles.itemDay}>05-12</span>
  //     <span className={styles.itemTime}>18:23</span>
  //   </div>
  //   <div className={styles.itemMain}>
  //     <p>
  //       在广东东莞大朗公司进行夏季地点扫描， 即将发 往：天河市内包
  //     </p>
  //   </div>
  // </div>
  // <div className={styles.item}>
  //   <span className={styles.itemIcon} />
  //   <div className={styles.itemDate}>
  //     <span className={styles.itemDay}>05-12</span>
  //     <span className={styles.itemTime}>18:23</span>
  //   </div>
  //   <div className={styles.itemMain}>
  //     <h3>已揽件</h3>
  //     <p>在广东东莞大朗公司进行揽件扫描</p>
  //   </div>
  // </div>
  // <div className={styles.item}>
  //   <span className={styles.itemIcon} />
  //   <div className={styles.itemDate}>
  //     <span className={styles.itemDay}>05-12</span>
  //     <span className={styles.itemTime}>18:23</span>
  //   </div>
  //   <div className={styles.itemMain}>
  //     <h3>已发货</h3>
  //     <p>卖家发货</p>
  //   </div>
  // </div>

  dealSteps = details => {
    let tmp = [],
      expresState;

    details.map((d, i) => {
      if (d.opcode[0] === "1") {
        expresState = 1;
      }
      if (d.opcode[0] === "2") {
        expresState = 4;
      }
      tmp.push({
        AcceptTime: d.operateTime[0],
        AcceptStation: d.operateContent[0]
      });
    });

    return { expresState, steps: tmp.reverse() };
  };

  render() {
    const { name, orderOne, express, product } = this.props;
    let steps = [];
    let state, date, company, no;

    if (
      express &&
      express.logistics &&
      express.logistics.details &&
      express.logistics.details.length > 0
    ) {
      steps = this.dealSteps(express.logistics.details).steps;
      state = this.dealSteps(express.logistics.details).expresState || 0;
      // state = express.logistics.state;
      company = express.logistics.company;
      no = express.logistics.no;
      date = steps[steps.length - 1].AcceptTime;
    }

    return (
      <div className={styles.wrap}>
        <Nav title={name} history={this.props.history} isLeft={true} />
        <div className={styles.main}>
          <div style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.23)" }}>
            <div className={styles.title}>
              <img src={product && product.mainImg} />
              <div className={styles.titleText}>
                <span className={styles.newState}>
                  {this.returnNewStatus(state)}
                </span>
                <span
                  className={styles.newDate}
                  style={state === 4 ? {} : { display: "none" }}
                >
                  {steps[0] &&
                    `签收时间为${moment(steps[0].AcceptTime).format(
                      "MM月DD日"
                    )}`}
                </span>
              </div>
            </div>
            {company &&
              no && (
                <div className={styles.number}>
                  <span>{companys[company]}</span>
                  <span style={{ marginLeft: "3vw" }}>{no}</span>
                </div>
              )}
          </div>
          <div className={styles.list}>
            <div>
              {orderOne &&
                orderOne.address && (
                  <div className={styles.item}>
                    <span
                      className={styles.itemIcon}
                      style={state === 4 ? {} : { backgroundColor: "#C5C5C5" }}
                    >
                      收
                    </span>
                    <div className={styles.itemMain}>
                      <p>
                        [收货地址] {orderOne.address.provinceName}
                        {orderOne.address.cityName}
                        {orderOne.address.districtName}
                        {orderOne.address.detailInfo}
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
                      {moment(s.AcceptTime).format("MM-DD")}
                    </span>
                    <span className={styles.itemTime}>
                      {moment(s.AcceptTime).format("HH:mm")}
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
                      {moment(date).format("MM-DD")}
                    </span>
                    <span className={styles.itemTime}>
                      {moment(date).format("HH:mm")}
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

Express.propTypes = {};

const mapStateToProps = state => {
  return {
    orderOne: state.order.orderOne,
    express: state.order.express,
    product: state.box.product
  };
};

export default connect(mapStateToProps)(Express);
