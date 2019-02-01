import { Component } from "react";
import { connect } from "dva";
import styles from "./orderSuccess.scss";

import modal from "../../assets/Img/succ-modal.png";

class OrderSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goback = this.goback.bind(this);
  }

  componentWillMount() {
    this.props.dispatch({
      type: "draw/getDrawSettings"
    });
    this.props.dispatch({
      type: "crystal/getCrystal"
    });
  }

  goback(e) {
    e.stopPropagation();
    this.props.history.push("/game");
  }

  render() {
    let { drawSettings = {}, crystal = {} } = this.props;
    let { drawCrystal, buyCrystal } = drawSettings;
    let num = this.props.params&&this.props.params.num?this.props.params.num:1;

    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <div className={styles.text}>
            <span className={styles.text1}>购买完成！</span>
            <span className={styles.text2}>恭喜你获得</span>
            <span className={styles.text3}>
              {buyCrystal*num || 0}
              水晶
            </span>
            <span className={styles.text4}>
              可抽
              {crystal.count && drawCrystal
                ? Math.floor(crystal.count / drawCrystal)
                : 0}
              次大奖!
            </span>
          </div>
          <a className={styles.btn} onClick={this.goback} />
          <div className={styles.desc} />
        </div>
      </div>
    );
  }
}

OrderSuccess.propTypes = {};

const mapStateToProps = state => {
  return {
    drawSettings: state.draw.drawSettings,
    crystal: state.crystal.number
  };
};

export default connect(mapStateToProps)(OrderSuccess);
