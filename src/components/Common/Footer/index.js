import { Component } from 'react'
import { InputItem } from 'antd-mobile'
import styles from './index.scss'
import indexIcon from '../../../assets/Img/indexIcon.png';
import indexIcon1 from '../../../assets/Img/indexIcon1.png';
import personIcon from '../../../assets/Img/personIcon.png';
import personIcon1 from '../../../assets/Img/personIcon1.png';

class TimeCountDown extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
	}
	render() {
		const { num } = this.props;
		const footData = [
			{name:'首页',src:indexIcon,focusSrc:indexIcon1},
			{name:'我的',src:personIcon,focusSrc:personIcon1},
		];
		return(
			<ul className={styles.footer}>
				{footData.map((item,i)=>
					<li key={i} className={i===num?styles.focusLi:''}><img src={i===num?item.focusSrc:item.src}/><div className={i===num?styles.focus:''}>{item.name}</div></li>)
				}
			</ul>
		)
	}
}

TimeCountDown.propTypes = {}

export default TimeCountDown