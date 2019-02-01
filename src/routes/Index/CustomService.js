import { Component } from 'react';
import { connect } from 'dva';
import { Carousel, WingBlank } from 'antd-mobile';
import imgBackground from '../../assets/Img/imgBackground.png';
import styles from './CustomService.scss';
//跳转外链


class customService extends Component {
  render() {
  	const { banner } = this.props;
  	const { qrcode } = banner;
   	return (
   		<div className={styles["container"]}>
	      <div className={styles["CustomServiceBox"]}>
	      	<img src={imgBackground}/>
	      	<img src={qrcode && qrcode.image}  className={styles["imgbox"]}/>
	      </div>
   		</div>
    );
  }
}

customService.propTypes = {};

const mapStateToProps = state => {
  const { me } = state.account;
  const { banner } = state.CustomService;

  return {
    me: localStorage.me ? JSON.parse(localStorage.me) : me,
    banner
  };
};

export default connect(mapStateToProps)(customService);
