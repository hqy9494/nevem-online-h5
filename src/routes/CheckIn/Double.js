import { Component } from "react"
import { connect } from "dva"
import styles from "./Double.scss"

import doubleBg from '../../assets/Img/checkIn/doubleBg.png'
import doubleItem from '../../assets/Img/checkIn/doubleItem.png'
import zero from '../../assets/Img/checkIn/zero.png'
import three from '../../assets/Img/checkIn/three.png'
import ten from '../../assets/Img/checkIn/ten.png'
import fifty from '../../assets/Img/checkIn/fifty.png'

import modalTen from '../../assets/Img/checkIn/modalTen.png'
import prizeDisplay from '../../assets/Img/checkIn/prizeDisplay.png'

class CheckInDouble extends Component{
  state = {
    zero: zero,
    three: three,
    ten: ten,
    fifty: fifty,
    currentImg: ten,
    defaultImg: doubleItem,
    modalTen: false,
    isDisplay: true,
    zeroActive: false,
    threeActive: false,
    tenActive: false,
    fiftyActive: false,
  }

  componentDidMount(){
    setTimeout(()=>this.setState({
      isDisplay: false
    }), 2000)
  }

  handleDouble = (name, origin, act) => {
    let obj = {}

    obj[name] = this.state.currentImg  //当前点击变为ten
    obj.ten = origin  //原有ten的位置变为当前点击的初始图片
    obj.defaultImg = null  //默认背景清空 显示图片
    obj[act] = true  //当前点击加上动画

    this.setState(obj)

    setTimeout(()=>this.handleModal('modalTen', true), 1000)

		// console.log(origin)
  }

  handleModal = (name, bool) => {
//		console.log(name, '操作模态')
    let obj = {}
    obj[name] = bool;

    this.setState(obj)

    if(!bool){  // 关闭重置
      this.setState({
        defaultImg: doubleItem,
        zero: zero,
        three: three,
        ten: ten,
        fifty: fifty,
        zeroActive: false,
        threeActive: false,
        tenActive: false,
        fiftyActive: false,
      })
    }
  }

  handleHref = () => {
    window.location.href = '#/home';
  }

  render(){

    const {defaultImg, zero, three, ten, fifty, zeroActive, threeActive, tenActive, fiftyActive } = this.state

    return(
      <div className={styles.container}>
        <img className={styles.doubleBg} src={doubleBg}/>
        <div className={styles.doubleBox}>
          <div className={styles.doubleItem} onClick={()=>this.handleDouble('fifty',fifty, 'fiftyActive')}>
            <img className={fiftyActive?styles.moveImg:''} src={defaultImg?defaultImg:fifty} />
          </div>
          <div className={styles.doubleItem} onClick={()=>this.handleDouble('three',three, 'threeActive')}>
            <img className={threeActive?styles.moveImg:''} src={defaultImg?defaultImg:three} />
          </div>
          <div className={styles.doubleItem} onClick={()=>this.handleDouble('zero',zero, 'zeroActive')}>
            <img className={zeroActive?styles.moveImg:''} src={defaultImg?defaultImg:zero} />
          </div>
          <div className={styles.doubleItem} onClick={()=>this.handleDouble('ten',ten, 'tenActive')}>
            <img className={tenActive?styles.moveImg:''} src={defaultImg?defaultImg:ten} />
          </div>
        </div>

        {/* 10倍弹框 */}
        <div className={`${styles.modal} ${styles.modalTen}`} style={{visibility: this.state.modalTen ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={modalTen} alt="tenfold"/>
            <div className={styles.btn} onClick={() => this.handleModal('modalTen', false)}/>
            <div className={styles.btnOpen}
                 onClick={
                   () => {
                     this.handleHref('modalTen', false)
                   }
                 }
            />
          </div>
        </div>

        {/*奖品展示*/}
        <div className={`${styles.modal} ${styles.modalDisplay}`} style={{visibility: this.state.isDisplay ? 'visible' : 'hidden'}}>
          <img className={this.state.isDisplay?styles.showHide:''} src={prizeDisplay} />
        </div>
      </div>
    )
  }
}

export default CheckInDouble
