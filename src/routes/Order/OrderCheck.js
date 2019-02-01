import { Component } from "react";
import { connect } from "dva";
import styles from "./orderCheck.scss";
import Nav from "../../components/Common/Nav/Nav";
import { Toast } from "antd-mobile";
import moment from "moment";

import NumebrInput from "../../components/Common/NumberInput/NumberInput";

const Stepper = ({ value, onAdd, onReduce, onNumChange }) => (
  <div className={styles.stepper}>
    <a href="javascript:;" onClick={onReduce}>
      -
    </a>
    <NumebrInput
      render={() => <span>{value}</span>}
      value={value}
      maxLength={3}
      onChange={onNumChange}
    />
    <a href="javascript:;" onClick={onAdd}>
      +
    </a>
  </div>
);

class OrderCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
    this.onAdd = this.changeNum.bind(this, "add");
    this.onReduce = this.changeNum.bind(this, "sub");
    this.onNumChange = this.onNumChange.bind(this);
    this.createOrder = this.createOrder.bind(this);

    this.slot =
      props.params && (props.params.slot || props.params.slot === 0)
        ? props.params.slot
        : null;
    this.buyedNum = this.getbuyedNum();
  }

  componentWillMount() {
    // alert(window.location.href);
    // window.location.reload();
    if (
      this.props.addressList &&
      this.props.addressList.length > 0 &&
      !this.props.selectedAddress
    ) {
      let defaultAddress = this.props.addressList.find(a => a.isDefault);
      defaultAddress &&
        this.props.dispatch({
          type: "address/setAddress",
          payload: defaultAddress
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.addressList &&
      nextProps.addressList.length > 0 &&
      !nextProps.selectedAddress
    ) {
      let defaultAddress = nextProps.addressList.find(a => a.isDefault);
      defaultAddress &&
        this.props.dispatch({
          type: "address/setAddress",
          payload: defaultAddress
        });
    }
  }

  getbuyedNum() {
    let buy = localStorage.buy;
    // console.log(localStorage.buy);
    if (buy && JSON.parse(buy) && JSON.parse(buy).date && JSON.parse(buy).num) {
      if (JSON.parse(buy).date === moment().format("YYYY-MM-DD")) {
        return JSON.parse(buy).num;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  onNumChange = v => {
    let max =
      this.props.drawSettings && this.props.drawSettings.buyLimit
        ? this.props.drawSettings.buyLimit
        : 3;
    if (parseInt(v)) {
      if (parseInt(v) + this.buyedNum > max) {
        // Toast.info(`每日购买盒数不可以超过${max}盒, 今日已购${this.buyedNum}盒`, 1);
        Toast.info(
          `感谢您的支持，幸运盒子每天限购${max}个，须等明天才能继续购买。`,
          1
        );
        return;
      }
      this.props.dispatch({
        type: "box/changeBox",
        payload: parseInt(v)
      });
    }
  };

  changeNum = sign => {
    const { num } = this.props;
    let max =
      this.props.drawSettings && this.props.drawSettings.buyLimit
        ? this.props.drawSettings.buyLimit
        : 3;
    if (sign === "add" && num + 1 + this.buyedNum > max) {
      // Toast.info(`每日购买盒数不可以超过${max}盒, 今日已购${this.buyedNum}盒`, 1);
      Toast.info(
        `感谢您的支持，幸运盒子每天限购${max}个，须等明天才能继续购买。`,
        1
      );
      return;
    }
    this.props.dispatch({
      type: "box/changeBox",
      payload: Math.max(1, sign === "sub" ? num - 1 : num + 1)
    });
  };

  createOrder() {
    const { num, addressList, selectedAddress } = this.props;
    let max =
      this.props.drawSettings && this.props.drawSettings.buyLimit
        ? this.props.drawSettings.buyLimit
        : 3;
    if (this.buyedNum >= max) {
      // Toast.info(`每日购买盒数不可以超过${max}盒`, 1);
      Toast.info(
        `感谢您的支持，幸运盒子每天限购${max}个，须等明天才能继续购买。`,
        1
      );
      return;
    }

    if (!selectedAddress || !selectedAddress.id) {
      Toast.info("请选择收货地址", 1);
      return;
    }
    if (num > 0 && this.slot) {
      this.props
        .dispatch({
          type: "order/create",
          payload: {
            productNo: [this.slot],
            addressId: selectedAddress.id,
            total: num
          }
        })
        .then(config => {
          this.wxpay(config.result, res => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              if (localStorage.buy && JSON.parse(localStorage.buy)) {
                let buy = JSON.parse(localStorage.buy);
                let date = moment().format("YYYY-MM-DD");
                if (date === buy.date) {
                  localStorage.buy = JSON.stringify({
                    date,
                    num: buy.num + num
                  });
                } else {
                  localStorage.buy = JSON.stringify({ date, num });
                }
              } else {
                localStorage.buy = JSON.stringify({
                  date: moment().format("YYYY-MM-DD"),
                  num
                });
              }

              this.buyedNum = this.getbuyedNum();

              this.props.history.push(`/order/success?num=${this.props.num}`);
              // this.props.history.push('/game');
            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            }
          });
        });
      let defaultAddress = addressList.find(a => a.isDefault);

      if (defaultAddress && defaultAddress.id !== selectedAddress.id) {
        this.props.dispatch({
          type: "address/update",
          payload: {
            id: defaultAddress.id,
            isDefault: false
          }
        });
      }

      this.props.dispatch({
        type: "address/update",
        payload: {
          id: selectedAddress.id,
          isDefault: true
        }
      });
    }
  }

  wxpay(data, cb) {
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          () => onBridgeReady(),
          false
        );
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", () => onBridgeReady());
        document.attachEvent("onWeixinJSBridgeReady", () => onBridgeReady());
      }
    } else {
      onBridgeReady();
    }

    function onBridgeReady() {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {// eslint-disable-line
        cb && cb(res);
      });
    }
  }

  render() {
    const { name, num, addressList, selectedAddress, product } = this.props;
    const {modalShow,tipShow}=this.state;

    return (
      <div className={styles.wrap}>
        <Nav title={name} history={this.props.history} isLeft={true} />
        <div className={styles.main}>
          {selectedAddress && addressList && addressList.length > 0 ? (
            <div
              className={styles.section1}
              onClick={() => {
                this.props.history.push(`/selectAddress?slot=${this.slot}`);
              }}
            >
              <span className={styles.addressIcon} />
              <span className={styles.addressMore} />
              <div>
                <div>
                  <span className={styles.username}>
                    收货人：
                    {selectedAddress.userName}
                  </span>
                  <span className={styles.phone}>
                    {selectedAddress.telNumber}
                  </span>
                </div>
                <div className={styles.address}>
                  收货地址：
                  {selectedAddress.provinceName}
                  {selectedAddress.cityName}
                  {selectedAddress.districtName}
                  {selectedAddress.detailInfo}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={styles.section1}
              onClick={() => {
                this.props.history.push(`/selectAddress?slot=${this.slot}`);
                // if (addressList && addressList.length > 0) {
                //   this.props.history.push(`/selectAddress?slot=${this.slot}`);
                // } else {
                //   this.props.history.push(
                //     `/address/new?fromcheck=1&slot=${this.slot}`
                //   );
                // }
              }}
            >
              <span className={styles.noAddress}>
                您还没有选择地址，点击立刻设置地址
              </span>
            </div>
          )}

          <span className={styles.line} />
          <div className={styles.section2}>
            <label className={styles.payText}>支付方式</label>
            <span className={styles.payType}>在线支付</span>
          </div>
          <div className={styles.section3}>
            <img src={product ? product.mainImg : ""} />
            <div>
              <span className={styles.name}>{product && product.name}</span>
              <span className={styles.slot}>
                {this.slot && `${this.slot}号盒子`}
              </span>
              <span className={styles.price}>
                <small>￥</small>
                {product && product.price && (product.price / 100).toFixed(2)}
              </span>
            </div>
            <Stepper
              value={num || 0}
              onAdd={this.onAdd}
              onReduce={this.onReduce}
              onNumChange={this.onNumChange}
            />
          </div>
          <div className={styles.section4}>
            <label>配送</label>
            <div>
              <span>包邮</span>
              <span style={{ color: "#DA1A10" }}>7个工作日内发货</span>
            </div>
          </div>
          <div className={styles.section4} onClick={() => {
              this.setState({ modalShow: true, tipShow: true});
            }}>
            <label>购买协议</label>
            <span className={styles.addressMore} />
          </div>
        </div>
        <div className={styles.handle}>
          <div className={styles.handleLeft}>
            <span>
              合计：
              <span style={{ color: "#DA1A10" }}>
                <small>￥</small>
                {product &&
                  product.price &&
                  ((product.price / 100) * num).toFixed(2)}
              </span>
            </span>
          </div>
          <a className={styles.handleRight} onClick={this.createOrder}>
            去支付
          </a>
        </div>

        {modalShow && (
          <div
            className={styles.mask}
            onClick={() => {
              this.setState({ modalShow: false, tipShow: false});
            }}
          />
        )}
        {modalShow && tipShow && <div className={styles.modal}>
          <h3>购买协议</h3>
          <div className={styles.modalHandle}>
            <p>
              1关于产品
              <br />
              购买线上盒子后您将会获得“幸运盒子”（内含1-2个产品）+120水晶（用于线上抽奖）
              <br />
              2关于物流
              <br />
              幸运盒子将在下单后的3-10日内通过快递的形式发出。
              <br />
              3关于运费
              <br />
              幸运盒子国内包邮（不含港澳台地区）。
              <br />
              4关于售后
              <br />
              （1）因“幸运盒子”性质特殊，一经出售，非因产品质量问题，不适用七天无理由退换货，请您知悉。
              <br />
              （2）如果产品发生质量（如包装损坏、盒内产品损坏等）问题，请联系心愿先生客服，我们将会在情况核实后3-10个工作日内补发新的幸运盒子。
              <br />
              （3）如因买家自己拍错或者个人原因（不喜欢、不想要、没抽到想要的东西）则无法退货
              <br />
              （4）可以申请退款的情形：①.心愿先生在规定时间内没有寄出快递盒子②.购买者填写地址在心愿先生无法寄达的地区（如港澳台、海外）。{" "}
              <br />
               <br />
              （购买前请仔细阅读购买须知，下单则默认为已阅读并且同意上述条款）
            </p>
          </div>
        </div>}
      </div>
    );
  }
}

OrderCheck.propTypes = {};

const mapStateToProps = state => {
  return {
    num: state.box.num,
    addressList: state.address.addressList,
    selectedAddress: state.address.selectedAddress,
    defaultAddressId: state.address.defaultAddressId,
    product: state.box.product,
    wxPayConfig: state.order.wxPayConfig,
    drawSettings: state.draw.drawSettings
  };
};

export default connect(mapStateToProps)(OrderCheck);
