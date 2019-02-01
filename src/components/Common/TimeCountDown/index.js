import { Component } from 'react'
import { InputItem } from 'antd-mobile'

class TimeCountDown extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time: ''
		}
	}
	componentWillMount() {
		const {time} = this.props;
		this.timeAuto(this.temToTime(time), this.props.callback);
	}
	componentWillUnmount(){
    clearInterval(this.mytimer)
  }
	temToTime = (time) =>{
		const [D,H,M,S] = [86400000,3600000,60000,1000];
		let d = Math.floor(time / D);
		let h = Math.floor((time - (d * D))/H);
		let m = Math.floor((time - (d * D + h * H))/M);
		let s = Math.floor((time - (d * D + h * H + m*M))/S);
		return `${d+'天 '+h+':'+m+':'+s}`
	}
	timeAuto = (time, callback) => {
		time = time.replace('天',':');
		time = time.split(':');
		let [d,h,m,s] = time;
		this.mytimer = setInterval(() => {
			if(s == 0) {
				if(m == 0) {
					if(h == 0) {
						if( d == 0){
							clearInterval(this.mytimer);
							callback();
							return '0天 00:00:00';
						}
						d--;
						h = 24;
					}
					h--;
					m = 60;
				}
				m--;
				s = 60;
			}
			s--;
			h<10 && h[0]!=='0'?h = '0'+h:'';
			m<10 && m[0]!=='0'?m = '0'+m:'';
			s<10 && s[0]!=='0'?s = '0'+s:'';
			this.setState({
				time:  d +'天'+ h + ':' + m + ':' + s
			});
		}, 1000);
	}
	render() {
		const {
			time
		} = this.state;
		return(
			<span>{time}</span>
		)
	}
}

TimeCountDown.propTypes = {}

export default TimeCountDown
