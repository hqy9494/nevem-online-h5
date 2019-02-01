import { Component } from "react";
import { connect } from "dva";
import styles from "./BoxPage.scss";
import NumebrInput from "../../components/Common/NumberInput/NumberInput";
import { Toast } from "antd-mobile";
import moment from "moment";

import modal from "../../assets/Img/buy-modal.png";
class BoxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.buyedNum = this.getbuyedNum();
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
    this.props.dispatch({
      type: "box/changeBox",
      payload: v
    });
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
  render() {
    const { num } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.modal}>
          <img src={modal} />
          <span className={styles.number}>
            {this.props.match.params.id}
            号盒子
          </span>
          <div className={styles.steps}>
            <span className={styles.stepsLabel}>数量：</span>
            <div className={styles.stepsMain}>
              <span
                className={styles.stepSub}
                onClick={() => this.changeNum("sub")}
              />
              <span className={styles.stepsNumber}>{num}</span>
              <span
                className={styles.stepsAdd}
                onClick={() => this.changeNum("add")}
              />
            </div>
          </div>
          <a
            className={styles.submit}
            href="javascript:;"
            onClick={() => {
              if (this.props.match.params && this.props.match.params.id) {
                this.props.history.push(
                  `/orderCheck?slot=${this.props.match.params.id}`
                );
              }
            }}
          >
            立即购买
          </a>
        </div>
      </div>
    );
  }
}

BoxPage.propTypes = {};

const mapStateToProps = state => {
  return {
    drawSettings: state.draw.drawSettings,
    num: state.box.num
  };
};

export default connect(mapStateToProps)(BoxPage);
