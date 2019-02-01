import { Component } from "react"
import { connect } from "dva"
import styles from "./SelectCard.scss"
import bgimg from "../../assets/Img/signin/doubleBg.png"
import card from "../../assets/Img/signin/doubleItem.png"
import info from "../../assets/Img/signin/modalTen.png"
// import zero from "../../assets/Img/signin/zero.png"
// import three from "../../assets/Img/signin/three.png"
// import ten from "../../assets/Img/signin/ten.png"
// import fifty from "../../assets/Img/signin/fifty.png"
import common from '../../common/common'
import {parseParameter} from '../../utils/utils'
// import avatar from '../../assets/Img/crystal/avatar.png'
// import shareimg from '../../assets/Img/crystal/sharewximg.png'
import { Modal } from 'antd-mobile';
import moment from 'moment'
const alert = Modal.alert;
let arr1 = ['card1','card2','card3','card4'];     //盖上className
let arr2 = ['card10','card20','card30','card40'];  //翻开className
let arr3 = ['card100','card200','card300','card400'];  //翻开发亮className
class SelectCard extends Component { 
  
  componentWillMount(){
  }

  componentDidMount() {
    this.animation()
  }

  animation = () => {
    let cards = this.props.cards;
    let date = localStorage.getItem('date');
    if(date===moment(new Date()).format('YYYY-MM-DD')){
      alert('亲，一天只能玩一次哦！')
    }else{
      if(this.props.flag){      //翻一次牌后设为false，不再重发
        this.handleModal('flag',false);   //发一次牌之后前进后退都不会再发
        setTimeout(()=>{
          cards.map((e,i)=>{
            e.class = styles.focus;
          })
          this.handleModal('openCards',false);
          for(let i = 0;i<=cards.length;i++){
            setTimeout(()=>{
              if(i==0){
                cards[i].class = styles.card1;
              }
              else if(i==1){
                cards[i].class = styles.card2;
              }
              else if(i==2){
                cards[i].class = styles.card3;
              }
              else if(i==3){
                cards[i].class = styles.card4;
              }else {
                this.handleModal('openCards',true);
                return;
              }
                this.handleModal('cards',cards);
            },i*500+1000)
          }
        },3000)
      }
    }
  }

  handleModal = (name, value) => {
    this.props.dispatch({
      type: 'SelectCard/change',
      payload: {
        name,
        value
      }
    })
  }
  handleModalCancel=(name,value)=>{
    this.handleModal(name,value);
    this.handleModal('openCards',false)
    setTimeout(() => {
      this.props.history.push('/indexHome')
    }, 2000);
  } 
  handleCardOpen = (index)=>{
    localStorage.setItem("date",moment(new Date()).format('YYYY-MM-DD'))
    if(this.props.openCards){
        this.handleModal('flag',false);         //发一次牌后不再发
        this.handleModal('openCards',false)   //翻一次牌后禁止翻牌
        //存放卡牌类名和路径
        let cardList = this.props.iniCards;
        let newArr =  this.newList(cardList,index);  //按点击卡牌的索引重新构造cardList
    //    cards = newArr;
        this.handleModal('cards',newArr);   //刷新
        setTimeout(() =>{
            newArr.forEach((e,i)=>{
                if(i==index){
                    e.class = styles[arr3[i]];
                }else{
                    e.class = styles[arr2[i]];
                }
            })
            this.handleModal('cards',newArr);
        },2000)
        setTimeout(() => {
            this.handleModal('modalPrize',true)
        }, 4000);
     }
    }

  newList=(arr,index)=>{
    let indexArr = [0];    //存索引顺序，0永远是第一个，1~3打乱
    let randomArr = [];    //将arr第0个后面的顺序打乱
    let nArr = [];         //arr[0]在index位置翻开，其它打乱盖上
    //创建0开头的随机索引数组
    for(let i = 0;i<arr.length-1;i++){
      let n = 0;
      let a = parseInt(Math.random()*(arr.length-1)+1)
      indexArr.forEach((e,i)=>{
        if(a==e){
          n++
        }
      })
      if(n==0){
        indexArr.push(a)
      }else{
        i--;
      }
    }
    // console.log(indexArr) 
    //将传入数组元素按索引数组排序
    indexArr.map((e,i)=>{
      randomArr.push(arr[e])
    })
    //先push Arr[0]，之后根据index决定push或unshift，让第arr[0]在index位置
    nArr.push(randomArr[0]);
    for(let i=1;i<randomArr.length;i++){      
        if(nArr.length<=index){
          nArr.unshift(randomArr[i]);
        }else{
          nArr.push(randomArr[i]);
        }
    }
    //第index个翻开高亮，其它盖上
    nArr.forEach((e,i)=>{
      if(i==index){
        e.class = styles[arr3[i]]
      }else{
        e.class = styles[arr1[i]]
      }
    })
    return nArr
  }


  shareModal = (that) => {
    that.props.diapatch({type: 'like/change', payload: {name: 'modalFindTeam', value: false}})
  }
//   handleWxShare = (id) => {
//     const wx = window.wx
//     const that = this

//     wx.ready(() => {
//       let name = localStorage.me && localStorage.me.nickname || ''
//       let title = `${name}邀请你参与签到赢水晶抽Iphone XS`
//       let desc = `参与签到活动可获得随机水晶翻倍奖励瓜分巨额水晶，水晶最高可抽IPHONE XS`
//       let friendTitle = `${name}邀请你参与签到赢水晶抽iPhone XS参与签到可获得大量水晶，水晶最高可抽iPhone Xs`

//       let params = JSON.stringify({
//         url: '/indexHome',
//         hostId: id
//       })
//       // const link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=like&hostId=${id}`
//       let link = `${common.baseEquipmentURL}/wx/shop/switch?redirectTo=${encodeURIComponent(params)}`
//       console.log(link, 'link')

//       wx.onMenuShareAppMessage({
//         title, // 分享标题
//         desc, // 分享描述
//         link, // 分享链接，该链接域名必须与当前企业的可信域名一致
//         imgUrl: shareimg, // 分享图标
//         type: 'link', // 分享类型,music、video或link，不填默认为link
//         success: function () {
//           // 用户确认分享后执行的回调函数
//           console.log('success')
//           that.shareModal(that)
//         },
//         cancel: function () {
//           // 用户取消分享后执行的回调函数
//           console.log('error')
//           that.shareModal(that)
//         }
//       })

//       wx.onMenuShareTimeline({
//         title: friendTitle, // 分享标题
//         link,
//         imgUrl: shareimg, // 分享图标
//         success: function () {
//           // 用户确认分享后执行的回调函数
//           console.log('success')
//           that.shareModal(that)
//         },
//         cancel: function () {
//           // 用户取消分享后执行的回调函数
//           console.log('error')
//           that.shareModal(that)
//         }
//       })

//       wx.onMenuShareQQ({
//         title, // 分享标题
//         desc, // 分享描述
//         link, // 分享链接
//         imgUrl: shareimg, // 分享图标
//         success: function () {
//           that.shareModal(that)
//           // 用户确认分享后执行的回调函数
//         },
//         cancel: function () {
//           that.shareModal(that)
//           // 用户取消分享后执行的回调函数
//         }
//       })

//       wx.onMenuShareWeibo({
//         title, // 分享标题
//         desc, // 分享描述
//         link, // 分享链接
//         imgUrl: shareimg, // 分享图标
//         success: function () {
//           that.shareModal(that)
//           // 用户确认分享后执行的回调函数
//         },
//         cancel: function () {
//           that.shareModal(that)
//           // 用户取消分享后执行的回调函数
//         }
//       })
//     })
//   }
  handleBody = (params) => {
    const arr = Object.keys(params)
    const bol = arr.some(v => this.props[v])

    document.body.style.overflow = bol ? 'hidden' : 'initial'
  }
  renderLeaderByMe = (me) => {
    return me ? Object.assign({}, me, {
      avatar: me.headimgurl
    }) : {}
  }
  render() {
    // console.log(this.props)
    const {modalPrize,cards} = this.props
    // const {leader, members} = teamData
    // const {hasTeam, joinAble} = checkUser
    // 系统个人信息
    // const meByOur = localStorage.meByOur ? JSON.parse(localStorage.meByOur) : {}
    // 微信个人信息
    // const me = localStorage.me ? JSON.parse(localStorage.me) : {}
    // let arr = this.handleMember(members)
    // 分享链接
    // this.handleWxShare(meByOur.id)

    // 处理body不能滑动
    this.handleBody({
      // modalSuccess,
      // modalInfo,
      modalPrize,
      // modalFindTeam,
      // modalMember
    })
    // 处理弹框
    // this.renderModal()
    // console.log(this.props, 'props')
    // const renderLeader = hasTeam ? leader : this.renderLeaderByMe(me)
    // console.log(renderLeader, arr, 'arr---')
    const cardArr = cards;
    console.log(cards)
    return (
      <div className={styles.page}>
        {/* <div className={styles.title}>
          <a>×</a>
          <p>心愿先生</p>
        </div> */}
        <div className={styles.content}>
          <img src={bgimg} alt="index" className={styles.bgimg}/>
          <div className={styles.cards}>
            
               {
                  cards.map((v, i) => (
                    <div className={v.class} key={i}>
                      <img src={card} className={styles.back} alt="点击翻牌" onClick={() => this.handleCardOpen(i)}></img>
                      <img src={v.src} className={styles.front} alt="点击翻牌"></img>
                    </div>
                  ))
                }
          </div>
        </div>
       
        
     
        {/* 赚钱攻略 modalInfo*/}
        <div className={`${styles.modal} ${styles.modalPrize}`} style={{visibility: this.props.modalPrize ? 'visible' : 'hidden'}}>
          <div className={styles.imgWrap}>
            <img src={info} alt="info"/>
            <div className={styles.btn} onClick={()=> this.handleModalCancel('modalPrize', false)}/>
            <div className={styles.buy} onClick={()=>{this.handleModal('modalPrize', false); this.props.history.push('/home');}}/>
          </div>
        </div>
      </div>
    );
  }
}

SelectCard.propTypes = {};

const mapStateToProps = state => {
  return {
    modalPrize: state.SelectCard.modalPrize,
    openCards: state.SelectCard.openCards,
    flag: state.SelectCard.flag,
    current: state.SelectCard.current,
    cards: state.SelectCard.cards,
    iniCards: state.SelectCard.iniCards,
  };
};

export default connect(mapStateToProps)(SelectCard);
