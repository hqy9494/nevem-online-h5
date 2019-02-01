import { Component } from 'react';
import { connect } from 'dva';
import {combindUrlParam} from '../../utils/utils'
import { Carousel, WingBlank } from 'antd-mobile';
import styles from './Home.scss';
import a2 from '../../assets/Img/a2.png';
import logo from '../../assets/Img/logo.png';
import icon1 from '../../assets/Img/HomeIcon1.png';//水晶抽奖
import icon2 from '../../assets/Img/HomeIcon2.png';//幸运盒子
import icon3 from '../../assets/Img/HomeIcon3.png';
import icon4 from '../../assets/Img/HomeIcon4.png';
import gotoPk from '../../assets/Img/gotoPkIcon.png';
import TimeCountDown from "../../components/Common/TimeCountDown";
import Footer from "../../components/Common/Footer";
import topButton from "../../assets/Img/topbtn.png"
//跳转外链
const toLink = "https://lkd.yooyuu.com.cn";


class Home extends Component {
  toLike = () => {
    const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}

    let param = {}

    if (meByOur) {
      param['hostId'] = meByOur.id
    }

    let str = combindUrlParam(param)

    this.props.dispatch({
      type: 'like/beforeCheckUser',
    }).then(v => {
      const {checkUser, teamData} = v
      // 判断是否组队成功（满4人）
      if (teamData.enable) {
        str = combindUrlParam(Object.assign({}, param, {
          teamId: teamData.id
        }))
        this.props.history.push(`/like/fine${str}`)
      } else{
        this.props.history.push(`/like${str}`)
      }
    })
  }
  render() {
  	const { banner } = this.props;
		const {topBanner = [],unstartBanner = [],startBanner = []} = banner;
  	const list = [
  		{name:'幸运盒子',src:icon2,to:()=>this.props.history.push('/indexHome')},
  		{name:'水晶抽奖',src:icon1,to:()=>this.props.history.push('/game')},
  		{name:'幸运晒单',src:icon3,to:()=>window.location.href = toLink+'/wx/wish'},
		{name:'个人中心',src:icon4,to:()=>this.props.history.push('/my')},
  	]
  	const autoPlay = [
  		{name:'恭喜某某某中奖苹果8一台',src:logo},
  		{name:'恭喜某某某中奖微波炉一个',src:logo},
  		{name:'恭喜某某某中奖手提袋一个',src:logo},
  		{name:'恭喜某某某谢谢惠顾！',src:logo},

  	]
  	/*const timeLimit = [
  		{time:'08:20:56',src:a2,callback:()=>{console.log(111)}},
  		{time:'07:23:53',src:a2,callback:()=>{console.log(222)}},
  		{time:'18:50:32',src:a2,callback:()=>{console.log(333)}}
  	]*/
   	return (
      <div className={styles.container}>
      		<div className={styles.bannerBox}>
    			<a className={styles.Ablock} href={topBanner[0] && topBanner[0].url || '#'}><img src={topBanner[0] && topBanner[0].image}/></a>
    			{/*<WingBlank style={{margin:0}}>
				    <Carousel className="my-carousel"
				      vertical
				      dots={false}
				      dragging={false}
				      swiping={false}
				      autoplay
				      infinite
				    >
				    	{autoPlay.map((item,i)=><div className="v-item" key={i}><div className={styles.autoplay}><div><img src={item.src}/></div>{item.name}</div></div>)}
				    </Carousel>
			  	</WingBlank>*/}
        	</div>

        	<div className={styles.nav}>
        		<ul>
        			{list.map((item,i) =>(<li key={i} onClick={item.to}><img src={item.src}/><div>{item.name}</div></li>))}
        		</ul>
	    			<div className={styles["gotoPK"]} onClick={this.toLike}>
	      			<img src={gotoPk}/>
		      	</div>
        	</div>
        {/*<a className={styles.Ablock} href='#'><img style={{width:'100%'}} src={topButton}/></a>*/}
        	{startBanner && startBanner.length ? <div className={styles.timeLimit}>
        		<div className={styles.top}>
        			<div className={styles.name}>
        				限时抢购
        			</div>
        		</div>
        		{startBanner.map((item,i)=>(
	        		<div className={styles.bottom} key={i}>
	        			<div className={styles.countDown}>
	        				倒计时	<TimeCountDown time={item.DTIME} callback={item.callback}/>
	        			</div>
	        			<a className={styles.Ablock} href={item.url || '#'}><img src={item.image}/></a>
	        		</div>
        		))}
        	</div>:''}
        	{unstartBanner && unstartBanner.length ? <div className={styles.timeLimit}>
        		<div className={styles.top}>
        			<div className={styles.name}>
        				活动预告
        			</div>
        		</div>
        		{unstartBanner.map((item,i)=>(
	        		<div className={styles.bottom} key={i}>
	        			<div className={styles.countDown}></div>
	        			<a className={styles.Ablock} href={item.url || '#'}><img src={item.image}/></a>
	        		</div>
        		))}
        	</div>:''}
        	{/*<Footer num={0}/>*/}
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = state => {

	console.log(state);

  const { me } = state.account;
  const { banner } = state.Home;

  return {
    me: localStorage.me ? JSON.parse(localStorage.me) : me,
    banner
  };
};

export default connect(mapStateToProps)(Home);
