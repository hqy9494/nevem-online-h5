import { Component } from "react";
import { connect } from "dva";
import styles from "./AwardPage.scss";
import a1 from "../../assets/Img/a1.png";
import award1 from "../../assets/Img/award1.png";
import award2 from "../../assets/Img/award2.png";
import award3 from "../../assets/Img/award3.png";
import award4 from "../../assets/Img/award4.png";
import { Icon } from "antd-mobile";
import classnames from "classnames";
import common from '../../common/common';

class AwardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

    if(this.props.params && this.props.params.token){
      this.props.dispatch({
        type: 'account/openidLogin',
        payload: {
          token: this.props.params.token
        }
      }).then((user) => {
        if (user) {
          this.props.dispatch({
            type: "award/getAward",
            payload:{
              order: "createdAt DESC"
            }
          });
        };
      });
    }else{
      this.props.dispatch({
        type: "award/getAward",
        payload:{
          order: "createdAt DESC"
        }
      });
    }
  }

  toEquipment=()=>{
    this.props.dispatch({
        type: 'account/getEquipmentToken',
      }).then(res=>{
        window.location.href = `${common.baseEquipmentURL}/static/wechat/${common.www}/myNewRecord.html?token=${res.id}`;
      })
  }

  render() {
    let { awards = [] } = this.props;

    return (
      <div className={styles.wrap}>
        <img src={a1} alt="top" className={styles.top} />
        <div className={styles.tabs}>
          <div className={styles.tab} onClick={this.toEquipment}><span>实体设备</span></div>
          <div className={`${styles.tab} ${styles.tabActive}`}><span>线上商城</span></div>
        </div>
        <div className={styles.list} style={{marginTop: "2vw"}}>
          {awards.map((a, i) => {
            return (
              <div className={styles.item} key={a.id}>
                <div className={styles.itemLeft}>
                  {(() => {
                    if (a.prizeType === "METARIAL") {
                      return <img src={award1} alt="item" />;
                    } else if (a.prizeType === "COUPON") {
                      return (
                        <div>
                          <span style={{top: "7vw"}}>
                            <sub>￥</sub>
                            {a.prizeValue}
                          </span>
                          <img src={award2} alt="item" />
                        </div>
                      );
                    } else if (a.prizeType === "RED_PACKET") {
                      return (
                        <div>
                          <span>
                            {a.prizeValue}
                            <sub>元</sub>
                          </span>
                          <img src={award3} alt="item" />
                        </div>
                      );
                    } else if (a.prizeType === "BOOK_CARD") {
                      return <img src={award4} alt="item" />;
                    }
                  })()}
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.title}>
                    {(() => {
                      if (a.prizeType === "METARIAL") {
                        return `${a.prizeName}等你拿`;
                      } else if (a.prizeType === "COUPON") {
                        return "淘宝现金抵用劵";
                      } else if (a.prizeType === "RED_PACKET") {
                        return `${a.prizeValue}元现金红包`;
                      } else if (a.prizeType === "BOOK_CARD") {
                        return "畅读读书卡";
                      }
                    })()}
                  </div>
                  {!a.isChecked ? (
                    <div
                      className={classnames({
                        [styles.to]: true,
                        [styles.use]: false
                      })}
                      onClick={() => {
                        if (a.prizeType === "METARIAL") {
                          if (a.addressId) {
                            this.props.history.push(
                              `/award/big?recordId=${a.id}`
                            );
                          } else {
                            this.props.history.push(
                              `/selectDrawAddress?id=${a.id}&formMy=1`
                            );
                          }
                        } else if (a.prizeType === "COUPON") {
                          // this.props.history.push("/award/card");
                          this.props.history.push(`/award/store/${a.prizeValue}`);
                        } else if (a.prizeType === "RED_PACKET") {
                        } else if (a.prizeType === "BOOK_CARD") {
                          this.props.history.push("/award/book");
                        }
                      }}
                    >
                      {(() => {
                        if (a.prizeType === "RED_PACKET") {
                          return "已领取";
                        } else {
                          return (
                            <span>
                              {(() => {
                                if (a.prizeType === "METARIAL" && !a.addressId) {
                                  return "去填地址";
                                } else {
                                  return "查看详情";
                                }
                              })()}
                              <Icon type="right" />
                            </span>
                          );
                        }
                      })()}
                    </div>
                  ) : (
                    <div
                      className={classnames({
                        [styles.to]: true,
                        [styles.use]: true
                      })}
                      onClick={() => {
                        if (a.prizeType === "METARIAL") {
                          if (a.addressId) {
                            this.props.history.push(
                              `/award/big?recordId=${a.id}`
                            );
                          } else {
                            this.props.history.push(
                              `/selectDrawAddress?id=${a.id}&formMy=1`
                            );
                          }
                        }
                      }}
                    >
                      {(() => {
                        if (a.prizeType === "RED_PACKET"||a.prizeType === "METARIAL") {
                          return "已领取";
                        } else {
                          return "已使用";
                        }
                      })()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    awards: state.award.awards
  };
};

export default connect(mapStateToProps)(AwardPage);
