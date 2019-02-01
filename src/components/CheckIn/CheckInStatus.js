import { Component } from 'react'
import styles from './CheckInStatus.scss'
import moment from 'moment'

import activeImg from "../../assets/Img/checkIn/checkIn_active.png"
import disableImg from "../../assets/Img/checkIn/checkIn_disable.png"
import successImg from "../../assets/Img/checkIn/checkIn_yes.png"
import diamondImg from "../../assets/Img/checkIn/checkIn_diamond.png"

import addTagImg from "../../assets/Img/checkIn/resignin.png"
import doubleTagImg from "../../assets/Img/checkIn/modify.png"

import topYes from "../../assets/Img/checkIn/top_yes.png"


class CheckInStatus extends Component{
	state = {
	    time: moment(new Date()).format('YY-MM-DD'),
	    timeall: moment(new Date()).format('YYYY-MM-DD'),

	}

	render(){
		const { dayInfo } = this.props
//		const isBefore = moment(dayInfo.date).isBefore(this.state.time) //是否在今天之前
		const isBefore = (dayInfo.date < this.state.timeall)
		const isToday = (this.state.timeall == dayInfo.date)

		let ele;

		if(isBefore){
			if(dayInfo.id){
				ele = (
          <div>
            <div className={`${styles.statusLine} ${styles.statusLineAct}`}>
            </div>
            <div className={styles.statusIcon}>
              <span><img className={styles.circleImg} src={activeImg} /></span>
              <em className={styles.statusIntegral}>+{dayInfo.crystal||0}</em>
            </div>
   				</div>
				);
			}else{
				ele = (
          <div>
            <div className={styles.statusLine}>
            </div>
            <div className={styles.statusIcon}>
            <div onClick={()=>{this.props.handleAddCheckIn(dayInfo.date)}}>
                {/*<span className={styles.statusBadge}>补签</span>*/}
                <span className={styles.statusTag}><img src={addTagImg} /></span>
                <span>
                  <img className={styles.circleImg} src={disableImg} />
                </span>
                <em className={styles.statusIntegral}>0</em>
            </div>
            </div>
          </div>
				);
			}
		}else{
			if(dayInfo.couldMagnify && !dayInfo.id){
				ele = (
          <div>
            <div className={styles.statusLine}>
            </div>
            <div className={styles.statusIcon}>
              {/*<span className={`${styles.statusBadge} ${styles.statusBadgeRed}`}>翻倍</span>*/}
              <span className={styles.statusTag}><img src={doubleTagImg} /></span>
              <span><img className={styles.circleImg} src={diamondImg} /></span>
            </div>
          </div>
				)
			}else if(isToday && dayInfo.id){ // 今天已签到
				ele = (
          <div>
            <div className={`${styles.statusLine} ${styles.statusLineAct}`}>
            </div>
            <div className={styles.statusIcon}>
              <span><img className={`${styles.circleImg} ${styles.topYes}`} src={topYes} /></span>
              <span><img className={styles.circleImg} src={successImg} /></span>
            </div>
					</div>
				);
			}else if(isToday && !dayInfo.id){ //今天未签到
				ele = (
          <div>
            <div className={styles.statusLine}>
            </div>
            <div className={styles.statusIcon}>
              <span><img className={styles.circleImg} src={disableImg} /></span>
              <em className={styles.statusIntegral}>0</em>
					  </div>
          </div>
				);
			}else{  // 今天之后不翻倍
				ele = (
          <div>
            <div className={styles.statusLine}>
            </div>
            <div className={styles.statusIcon}>
              <span><img className={styles.circleImg} src={diamondImg} /></span>
            </div>
          </div>
				)
			}
		}


		return (
			 <div className={styles.statusItem}>
		 		<div className={styles.statusContent}>

          {ele}
		 			<div className={styles.statusDay}>
		 				<span>{moment(dayInfo.date).format('MM.DD')}</span>
		 			</div>
		 		</div>
			 </div>
		)
	}
}

CheckInStatus.propTypes = {

}

export default CheckInStatus
