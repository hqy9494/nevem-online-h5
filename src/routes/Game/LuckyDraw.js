import { Component } from "react";
import { connect } from "dva";
import styles from "./luckyDraw.scss";
import styles1 from '../Index/IndexAnimatePage2.scss'
import Clipboard from "clipboard";
import { Toast } from "antd-mobile";
import qr from "../../assets/Img/book-qr.jpg";
import toLike from '../../assets/Img/animate/toLike.png'

class LuckyDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.getNumber = this.getNumber.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentWillMount() {
    this.props.dispatch({
      type: "draw/getDrawSettings"
    });
    this.props.dispatch({
      type: "crystal/getCrystal"
    });
  }

  componentWillUnmount() {
    this.stop();
  }

  getNumber(e) {
    e.preventDefault();
    let { drawSettings, crystal } = this.props;
    if (!drawSettings) drawSettings = {};
    if (!crystal) crystal = {};
    let { drawCrystal = 0 } = drawSettings;

    if (!this.state.loading) {
      if (crystal.count && crystal.count < drawCrystal) {
        this.setState({ modalShow: true, tipShow: true });
        return;
      }

      this.setState({ loading: true }, () => {
        this.props
          .dispatch({
            type: "draw/getDraw"
          })
          .then(result => {
            if (result.prizeType === "BOOK_CARD") {
              this.props
                .dispatch({
                  type: "draw/getBook",
                  payload: { drawRecordId: result.id }
                })
                .then(book => {
                  this.setState({ book });
                });
            }

            this.props.dispatch({
              type: "draw/getDrawSettings"
            });
            this.props.dispatch({
              type: "crystal/getCrystal"
            });

            const { drawSettings = {} } = this.props;
            let drawList = drawSettings.defaultList || [];
            let arr = Array.from(Array(12), (v, k) => k);
            let num;

            for (let i = 0; i < drawList.length; i++) {
              if (
                drawList[i].name === result.prizeName &&
                drawList[i].value === result.prizeValue
              ) {
                num = i;
                break;
              }
            }

            let concatArr = arr.concat(arr, arr, arr.slice(0, num + 1), [
              -1,
              arr[num],
              -1,
              arr[num],
              -1,
              arr[num]
            ]);

            this.setState(
              {
                drawResult: result,
                concatArr
              },
              () => {
                this.start();
              }
            );
          });
      });
    }
  }

  start() {
    const { concatArr } = this.state;
    this.setState({ at: 0 }, () => {
      this.turntable = setInterval(() => {
        if (this.state.at < concatArr.length - 1) {
          this.setState({ at: this.state.at + 1 });
        } else {
          this.setState({ modalShow: true });
          this.stop();
        }
      }, 80);
    });
  }

  stop() {
    this.setState({ loading: false });
    this.turntable && clearInterval(this.turntable);
  }

  dealDraw(drawList) {
    if (drawList.length < 12) {
      while (drawList.length < 12) {
        drawList = drawList.concat(drawList);
      }
    }
    return drawList.slice(0, 12);
  }

  returnFont(name) {
    let len = 0;
    if (name) {
      len = name.length;
    }
    // if (len >= 10) {
    //   return { fontSize: "4vw" };
    // } else
    if (len >= 8) {
      return { fontSize: "5vw" };
    } else if (len >= 6) {
      return { fontSize: "6vw" };
    } else if (len >= 4) {
      return { fontSize: "7vw" };
    } else {
      return { fontSize: "8vw" };
    }
    return {};
  }
  toLike = () => {
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    // 分享后，点赞的人，有可能有自己的队伍
    let param = {}

    if (meByOur) {
      param['hostId'] = meByOur.id
    }
    let str = this.combindUrlParam(param)

    this.props.dispatch({
      type: 'like/beforeCheckUser',
    }).then(v => {
      const {checkUser, teamData} = v
      // 判断是否组队成功（满4人）
      if (teamData.enable) {
        str = this.combindUrlParam(Object.assign({}, param, {
          teamId: teamData.id
        }))
        this.props.history.replace(`/like/fine${str}`)
      } else{
        this.props.history.replace(`/like${str}`)
      }
    })
  }
  combindUrlParam = (obj) => {
    let str = ''
    for(let i of Object.keys(obj)){
      str += `&${i}=${obj[i]}`
    }

    str = str ? `?${str.slice(1)}` : ''

    return str
  }
  render() {
    let { drawSettings = {}, crystal = {} } = this.props;
    const {
      loading,
      concatArr,
      at,
      drawResult,
      modalShow,
      tipShow
    } = this.state;
    let { defaultList = [], drawCrystal } = drawSettings;

    if (defaultList && defaultList.length > 0 && defaultList.length !== 12) {
      defaultList = this.dealDraw(defaultList);
    }

    const clipboard = new Clipboard(".copy", {
      text: () => {
        return this.state.book.code;
      }
    });
    clipboard.on("success", function(e) {
      Toast.info("复制成功", 1);
    });
    clipboard.on("error", function(e) {
      Toast.info("复制失败", 1);
    });
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    return (
      <div>
        {
          meByOur && <div className={styles1.toLike} onClick={() => this.toLike()}>
            <img src={toLike} alt="toLike"/>
          </div>
        }
        <div className={styles.page}>
          <div className={styles.title} />
          <div className={styles.crystal}>
            你共有
            <b>{crystal.count || 0}</b>
            点水晶，可参与抽奖
            <b>
              {crystal.count && drawCrystal
                ? Math.floor(crystal.count / drawCrystal)
                : 0}
            </b>
            次
          </div>
          <div className={styles.percentWrap}>
            <span className={styles.percentLabel}>
              幸运指数 <b>{crystal.drawLuckyPoint || 0}</b>
            </span>
            <div className={styles.percent}>
              <span
                style={{
                  width: `${
                    crystal.drawLuckyPoint < 100 ? crystal.drawLuckyPoint : 100
                  }%`
                }}
              />
            </div>
          </div>
          <p className={styles.desc}>
            幸运指数越玩越高，幸运值满则中大奖概率越高！
          </p>
          <div className={styles.turntable}>
            {defaultList.map((img, i) => {
              return (
                <div
                  key={i}
                  className={`${styles.turntableItem} ${
                    styles[`turntableItem${i + 1}`]
                  }${
                    loading && concatArr && concatArr[at] !== i
                      ? " " + styles.turntableItemMask
                      : ""
                  }`}
                  style={{ backgroundImage: `url(${img.picture})` }}
                />
              );
            })}
            <div className={styles.turntableAWrap}>
              <a className={styles.turntableA} onClick={this.getNumber}>
                <p>
                  {drawCrystal || 0}
                  水晶/次
                </p>
                <span>
                  <b>立即</b>
                  <b>抽奖</b>
                </span>
              </a>
            </div>
          </div>
          <p className={styles.rule}>
            每次抽奖消耗
            {drawCrystal || 0}
            水晶，水晶消耗完则抽奖机会用完，
            <br />
            可以返回首页再次购买心愿盒子获得水晶
            <br />
            {/* 或点击页面右上角“充值”按钮充值，10元/100水晶。 */}
          </p>
        </div>
        {modalShow && (
          <div
            className={styles.mask}
            onClick={() => {
              this.setState({ modalShow: false, tipShow: false, drawResult: {} });
            }}
          />
        )}
        {modalShow &&
          drawResult &&
          drawResult.prizeType === "RED_PACKET" && (
            <div className={styles.modal}>
              <h3>恭喜你获得！</h3>
              <div className={`${styles.main} ${styles.mainbg1}`}>
                <span className={styles.mainBag}>
                  {drawResult.prizeValue}元
                </span>
                <span className={styles.mainSmall}>现金红包</span>
              </div>
              <div className={styles.handle}>
                <p>
                  红包將自动发放，请点击前往公众号领取
                  <br />
                  在“个人中心”－“中奖纪录”查看。
                </p>
                <a
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ modalShow: false });
                    this.props.history.push("/award");
                  }}
                >
                  查看
                </a>
              </div>
            </div>
          )}
        {modalShow &&
          drawResult &&
          drawResult.prizeType === "COUPON" && (
            <div className={styles.modal}>
              <h3>恭喜你获得！</h3>
              <div className={`${styles.main} ${styles.mainbg2}`}>
                <span className={styles.mainBag}>
                  {drawResult.prizeValue}元
                </span>
                <span className={styles.mainSmall}>淘宝代金券</span>
              </div>
              <div className={styles.handle}>
                <p>
                  优惠券將自动发放，请点击前往公众号领取
                  <br />
                  在“个人中心”－“卡券中心”查看。
                </p>
                <a
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ modalShow: false });
                    this.props.history.push("/award");
                  }}
                >
                  查看
                </a>
              </div>
            </div>
          )}
        {modalShow &&
          drawResult &&
          drawResult.prizeType === "METARIAL" && (
            <div className={styles.modal}>
              <h3>恭喜你获得！</h3>
              <div className={`${styles.main} ${styles.mainbg3}`}>
                <span className={styles.mainText}>幸运大奖</span>
                <span
                  className={styles.mainBag}
                  style={this.returnFont(drawResult.prizeName)}
                >
                  {drawResult.prizeName}
                </span>
              </div>
              <div className={styles.handle}>
                <p>
                  您中了幸运大奖，请填好地址，
                  <br />
                  奖品会在7—10个工作日内寄出！
                </p>
                <a
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ modalShow: false });
                    this.props.history.push(
                      `/selectDrawAddress?id=${drawResult.id}`
                    );
                  }}
                >
                  填写收货地址
                </a>
              </div>
            </div>
          )}
        {modalShow &&
          drawResult &&
          drawResult.prizeType === "BOOK_CARD" && (
            <div className={styles.modal}>
              <h3>恭喜你获得！</h3>
              <div className={`${styles.main} ${styles.mainbg4}`}>
                <span className={styles.mainSmall}>心愿书屋</span>
                <span className={styles.mainBag}>读书卡</span>
              </div>
              <div className={styles.handle}>
                <p>
                  兑换码：
                  {this.state.book && this.state.book.code}
                </p>
                <a className="copy" href="javascript:;">
                  复制兑换码
                </a>
                <img src={qr} />
                <p>
                  点击“复制卡号”，长按二维码进入公众号，
                  <br />
                  点击“用户中心”－“储值卡充值”粘贴卡号即可领取
                </p>
              </div>
            </div>
          )}
        {modalShow &&
          tipShow && (
            <div className={styles.modal}>
              <div
                className={styles.handle}
                style={{
                  overflow: "inherit",
                  backgroundColor: "#fff",
                  borderRadius: "4.5vw",
                  paddingTop: "10vw"
                }}
              >
                <div className={styles.modalIcon} />
                <p>
                  你的水晶不足，请获取更多水晶
                  <br />
                  参与抽奖
                </p>
                <a
                  className="copy"
                  href="javascript:;"
                  onClick={() => {
                    this.props.history.push(`/indexHome`);
                  }}
                >
                  获取水晶
                </a>
              </div>
            </div>
          )}
      </div>
    );
  }
}

LuckyDraw.propTypes = {};

const mapStateToProps = state => {
  return {
    drawSettings: state.draw.drawSettings,
    crystal: state.crystal.number
  };
};

export default connect(mapStateToProps)(LuckyDraw);
