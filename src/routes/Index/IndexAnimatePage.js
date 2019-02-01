import { Component } from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import styles from './IndexAnimatePage.scss'
import b from '../../assets/Img/animate/box.png'
import circle from '../../assets/Img/animate/circle.png'
import buyinfo from '../../assets/Img/animate/buyinfo.png'

class IndexAnimatePage extends Component {
  state = {
    modal: false,
    isClick: true
  };
  handleModal = () => {
    this.setState({
      modal: true
    });
  };
  handleClose = () => {
    this.setState({
      modal: false
    });
  };
  pxToVw = (v) => {
    const baseFontSize = 7.5

    return v / baseFontSize +'vw'
  }
  handleClickItem = item => {
    if (item.isDown) return

    this.setState({
      isClick: false
    }, () => {
      this.props.dispatch({
        type: 'indexAnimate/changeBox',
        payload: {
          ...item,
          isDown: true
        }
      })
    })

    this.time = setTimeout(() => {
      this.props.history.push(`/buy/${item.title}`)
    }, 2000)
  }
  componentWillUnmount(){
    clearTimeout(this.time)
  }
  toAward = () => {
    this.props.history.push(`/game`)
  }
  toTop = () => {
    window.scrollTo(0, 0)
  }
  render() {
    const {box} = this.props
    const {isClick} = this.state

    const bottom = 176
    const itemHeight = 190
    const itemWidth = 176
    const allRow = Math.floor(box.length / 3)
    const numHeight = 10
    const itemTime = 0.95
    // console.log(box)
    return (
      <div className={styles.page}>
        <div className={styles.wrap}>
          <div className={styles.box}>
            {
              box && box.map((v, i) => (
                <img
                  src={b}
                  alt="box"
                  className={classnames({
                    [styles.item]: true,
                    [(() => {
                      switch(v.col){
                        case 1:
                          return styles[`item1Animate${v.row}`]
                        case 2:
                          return styles[`item2Animate${v.row}`]
                        case 3:
                          return styles[`item3Animate${v.row}`]
                      }
                    })()]: v.isDown
                  })}
                  key={i}
                  style={{
                    bottom: this.pxToVw((allRow - v.row) * itemHeight + numHeight + bottom),
                    left: this.pxToVw((v.col - 1) * itemWidth + 10),
                    width: this.pxToVw(103 * itemTime),
                    height: this.pxToVw(142 * itemTime)
                  }}
                />
              ))
            }
            {
              box && box.map((v, i) => (
                <div
                  className={styles.itemWrap}
                  // onClick={() => this.handleClickItem(v)}
                  key={i}
                  style={{
                    bottom: this.pxToVw((allRow - v.row) * itemHeight + numHeight + bottom - 10),
                    left: this.pxToVw((v.col - 1) * itemWidth + 10),
                    width: this.pxToVw(103 * itemTime),
                    height: this.pxToVw(160 * itemTime),
                  }}
                >
                  <img
                    src={circle}
                    alt="circle"
                    className={classnames({
                      [styles.circle]: true,
                      [styles.circleAnimate]: v.isDown
                    })}
                    style={{
                      width: this.pxToVw(66 * itemTime),
                      height: this.pxToVw(68 * itemTime)
                    }}
                  />
                </div>
              ))
            }
          </div>
          <div className={styles.clickBoxWrap}>
            <div className={styles.box}>
              {
                box && box.map((v, i) => (
                  <div
                    className={styles.itemWrap}
                    onClick={() => isClick && this.handleClickItem(v)}
                    key={i}
                    style={{
                      bottom: this.pxToVw((allRow - v.row) * itemHeight + numHeight + bottom),
                      left: this.pxToVw((v.col - 1) * itemWidth + 10),
                      width: this.pxToVw(103 * itemTime),
                      height: this.pxToVw(160 * itemTime),
                    }}
                  />
                ))
              }
            </div>
          </div>
          <img src={buyinfo} alt="buyinfo" className={styles.buyinfo} onClick={this.handleModal}/>
        </div>
        {
          this.state.modal && (
            <div className={styles.modal} onClick={this.handleClose}>
              <div
                className={styles.tip}
                onClick={e => {
                  e.stopPropagation();
                  return;
                }}
              >
                <span className={styles.modalClose} onClick={this.handleClose} />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

IndexAnimatePage.propTypes = {};

const mapStateToProps = state => {
  return {
    box: state.indexAnimate.box
  }
}

export default connect(mapStateToProps)(IndexAnimatePage);
