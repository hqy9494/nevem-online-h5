import { Component } from 'react'
import { connect } from 'dva'
import styles from './HomePage.scss'
import home from '../../assets/Img/animate/home.png'
import zhong from '../../assets/Img/animate/zhong.png'
import {Modal} from 'antd-mobile'

class HomePage extends Component {
  state = {
    isModal: false,
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }
  toIndex = () => {
    this.props.history.push('/home')
  }
  toDetail = () => {
    this.setState({
      isModal: true
    })
  }
  render() {
    return (
      <div className={styles.page}>
        <img src={home} alt="home" className={styles.img}/>
        <img src={zhong} alt="zhong" className={styles.zhong} onClick={this.toIndex}/>
        <div className={styles.toDetail} onClick={this.toDetail}></div>
        <Modal
          visible={this.state.isModal}
          transparent
          onClose={this.onClose('isModal')}
          title="产品列表"
        >
          <div className={styles.modalInfo}>
            <div>花花公子超级玩家50ml</div>
            <div>花花公子酷爽马布男士香水50ml</div>
            <div>花花公子诱惑达人男士香水50ml</div>
            <div>K11音响</div>
            <div>91031巨遮瑕星空气垫修颜霜01#巨遮瑕亮颜肌</div>
            <div>55004轻盈无痕幻彩四色散粉02#清透带闪03#哑光米色04#薄纱玫瑰</div>
            <div>C8808 电动洁面仪</div>
            <div>23046星空女王恒星奢华水亮口红 02#珊瑚迷醉04#红唇欲动</div>
            <div>55003玩美控油双色散粉01#奶黄色（浅肤色+粉色）02#薄荷紫（浅绿色+浅紫色）</div>
            <div>樱花氨基酸皂</div>
            <div>91015懒人提亮气色霜</div>
            <div>小块头充电宝</div>
            <div>金属耳机</div>
            <div>31022臻密羽扇轻妆睫毛膏</div>
            <div>小清新百搭韩版简约皮带学生表</div>
            <div>女学生韩版简约皮带复古大表盘潮流男女考试表</div>
            <div>1128温和清新眼唇卸妆水 蓝色02#</div>
            <div>卡通耳机 kt line</div>
            <div>N1202(刮痧纤体按摩器）</div>
            <div>黑色秘密男士香水</div>
            <div>百搭款斯文手表</div>
            <div>C1516 专业美妆套刷</div>
            <div>EK-06金属高品质耳机</div>
            <div>Tritan便携水杯 </div>
            <div>S0038A欧美风系列晴雨伞</div>
            <div>S0038C小雏菊系列晴雨伞</div>
            <div>韩蝉防晒保湿清透套装</div>
            <div>兰诗茵花仙子系列·羊奶燕麦皂</div>
            <div>运动耳机 oppe(白色）</div>
            <div>粉水晶手链</div>
            <div>白玛瑙手链</div>
            <div>黑玛瑙手链</div>
            <div>EX-06头戴式耳机</div>
            <div>折叠式背包</div>
            <div>N19洗发水护发素套装</div>
            <div>糖果色围巾</div>
            <div>便利随身壶</div>
            <div>简约流苏斜挎包</div>
            <div>编织手挽化妆包</div>
            <div>药丸便携玻璃杯</div>
            <div>小猪佩奇拼图</div>
            <div>魔法师水杯</div>
            <div>JS迷你加湿器</div>
            <div>蓝雨 10400毫安充电宝 移动电源 </div>
            <div>森麦 挂耳式运动耳机</div>
            <div>精油淡熏香家用香薰</div>
            <div>USB小夜灯</div>
            <div>泊泉雅防晒霜 面部防晒贵妇v7素颜</div>
            <div>B110抽盒装化妆棉(300片）</div>
            <div>花果香调解语棠香水30ml</div>
            <div>便携折叠餐盒暖灰色</div>
            <div>定时器</div>
            <div>耳机Sibyl</div>
            <div>花果香调烟雨篱香水30ml</div>
            <div>苹果袋装牛仔数据线</div>
            <div>三迪 J1005 时尚旅行收纳袋</div>
            <div>三托一数据线</div>
            <div>琪仕美  速型立体三合一眉笔85017</div>
            <div>马夹邦尼兔公仔（蓝）</div>
            <div>便携硅胶收纳包粉色</div>
            <div>B197 纯棉卸妆湿巾（120片）</div>
            <div>si-20高音质带麦耳机</div>
            <div>便携硅胶收纳包灰色</div>
            <div>黑色中筒6件套</div>
            <div>马夹邦尼兔公仔（绿）</div>
            <div>三迪熊 Q7244 高级麻浆吸油纸-深蓝（100枚）</div>
            <div>马夹邦尼兔公仔（粉）</div>
            <div>B316抽取式纯棉洁面巾（120片）</div>
            <div>冰密码 8158 美甲套装（6件套装）</div>
            <div>森系枫叶防紫外线抗风折叠伞</div>
            <div>冰密码8101美容方巾4片装</div>
            <div>冰密码 8302 双面按摩洁面刷</div>
            <div>头戴式耳机oppo</div>
            <div>冰密码 8353 脱毛剃刀超值5支装</div>
            <div>高阳毛巾厂家直销批发竹纤维110g纯棉毛巾超市礼品专供</div>
            <div>毛巾厂家批发 纯棉32股素色毛巾 多色礼品回礼面巾 定制logo</div>
            <div>蓝牙耳机W165 （新款）</div>
            <div>时尚三件套餐具浅灰色</div>
            <div>便携旅行分装瓶6件套蓝色</div>
            <div>化妆包红色/蓝色</div>
            <div>水立方餐垫浅灰色，米白色</div>
            <div>B223 水刺无尘化妆棉（1000片）</div>
            <div>手机支架(银色)</div>
            <div>游戏纸牌狼人杀</div>
            <div>游戏纸牌谁是卧底</div>
            <div>三迪熊 Q7134 腮红刷</div>
            <div>冰密码8131环保旅行套装</div>
            <div>动物印花杯子</div>
            <div>韩元季H6726全新双机能化妆棉组合475片</div>
            <div>韩元季 H7000 竹碳吸油纸</div>
            <div>韩元季 H6767 便携旅行套装 10件套</div>
            <div>美顿香水：多彩青春 悸动香水</div>
            <div>多彩青春 憧憬香水</div>
            <div>蝴蝶结风扇</div>
            <div>创意可折叠笔筒浅灰色</div>
            <div>HelloKitty风扇</div>
            <div>拍立得风扇</div>
            <div>多彩青春 柔情香水</div>
            <div>多彩青春 初恋香水</div>
            <div>多彩青春 拥抱香水</div>
            <div>AC556陶瓷瓶纤维散香棉棒</div>
            <div>D004后视镜自拍杆</div>
            <div>洗漱三件套米白色</div>
            <div>圆形雪花风扇</div>
            <div>洗漱三件套浅灰色</div>
            <div>三迪熊  Q7235  6件便携旅行套装</div>
            <div>日本Oubido樱美堂女性内衣小苏打鲜花香皂180g*12</div>
            <div>日本Oubido樱美堂婴幼儿衣物尿布植物纯皂180g*12</div>
            <div>Y020 弹力纤维发巾</div>
            <div>冰密码 8341 随行收纳多功能粉扑</div>
            <div>冰密码 8053 压缩毛巾10枚</div>
            <div>F118 干湿两用美妆粉扑</div>
            <div>三迪熊Q7216 可爱美甲套装（6件套）</div>
            <div>擦鞋包5件套</div>
            <div>M334A软萌猫咪卷发梳</div>
            <div>S9516时尚理发梳</div>
            <div>冰密码 8383 净颜吸油纸 100枚（蓝膜）</div>
            <div>全棉毛巾粉色</div>
            <div>时尚贝壳化妆包黑色</div>
            <div>时尚便携粘毛器米白色</div>
            <div>小猪佩奇风扇</div>
            <div>桌面支架 ipad手机通用支架</div>
            <div>时尚便携粘毛器暖灰色</div>
            <div>全棉毛巾蓝色</div>
            <div>创意简约马克杯白色</div>
            <div>琪仕美  85007（自动双头眉笔+修眉刀+眉卡）2#3#4#</div>
            <div>保湿滋润补水身体乳</div>
            <div>焕颜氨基酸洁面皂</div>
            <div>F5934 粉底刷+炫彩粉扑套装</div>
            <div>D042 专业修眉刀套装</div>
            <div>冰密码 8006 卷筒加宽型双眼皮</div>
            <div>冰密码 8115 修眉刀3支装</div>
            <div>日本Oubido樱美堂内衣清洁皂100g*2*12</div>
            <div>N1206 (双轮腰部按摩器)</div>
            <div>AC562玻璃瓶棉球散香棉棒蓝色海洋</div>
            <div>三迪熊 Q7241 抽取式化妆棉（200抽送100抽)</div>
            <div>冰密码  8023  SBR圆形粉扑10片</div>
            <div>B215 原色有机生态化妆棉（315片）</div>
            <div>F374生态洗脸扑（超值4片装）</div>
            <div>便携分装药盒蓝色</div>
            <div>便携分装药盒浅灰色</div>
            <div>便携旅行牙刷</div>
            <div>便携沐浴球粉色</div>
            <div>便携隐形眼镜伴侣盒浅灰色</div>
            <div>波点一字夹子钱包</div>
            <div>创意悬挂式旅行牙刷蓝色</div>
            <div>韩版波点卡包</div>
            <div>简约充电头</div>
            <div>可折叠旅行梳浅灰色</div>
            <div>旅行分装瓶蓝色</div>
            <div>兔子方形化妆镜</div>
            <div>香包15号麻布袋子蓝色-热带微风</div>
            <div>旅行分装瓶浅灰色</div>
            <div>开口夹子兔子零钱包</div>
            <div>可折叠旅行梳蓝色</div>
            <div>创意悬挂式旅行牙刷红色</div>
            <div>便携沐浴球蓝色</div>
            <div>便携隐形眼镜伴侣盒蓝色</div>
            <div>KY马卡龙自拍杆</div>
            <div>冰密码 8017 亲水性多彩粉扑4片装</div>
            <div>纸袋挂钩香包(柠檬/栀子花)</div>
            <div>冰密码 8032 竹炭环保美颜洗脸扑</div>
            <div>小猪佩奇套圈圈机</div>
            <div>F5940 泡水大炫彩粉扑套装</div>
            <div>B315网膜洗脸巾</div>
            <div>八爪鱼仔沐浴海绵米黄+白色</div>
            <div>爆米花铅笔</div>
            <div>可充电式无线鼠标</div>
            <div> Hello Kitty 卡通塑料分格饭盒</div>
            <div>海贼王黄金城卡通拼图</div>
            <div>羽博充电宝 便携大容量</div>
            <div>方盒子蓝牙无线音箱 </div>
            <div>12骨全自动雨伞</div>
            <div>ins女神原宿太阳伞</div>
            <div>床头静音闹钟</div>
            <div>可爱果冻水杯</div>
            <div>滋润保湿护手霜</div>
            <div>F5941 亲肤炫彩粉扑套装</div>
            <div>冰密码 8051 果冻压缩面膜粒20枚</div>
            <div>粉红豹毛绒玩具</div>
            <div>毛绒玩具熊娃娃熊</div>
            <div>旅行6件套</div>
            <div>便携旅行10件套</div>
            <div> 创意弹跳盖保温杯</div>
            <div>高档保温杯男女学生通用</div>
            <div>七龙珠手办</div>
            <div>三合一洁颜卸妆水</div>
            <div>ins超火链条包</div>
            <div>猫猫手帐 独角兽活页</div>
            <div>32G 高速车载电脑两用优盘</div>
            <div>黛维莉橄榄洗发水1L+沐浴露1L</div>
            <div>超轻小清新五折晴雨伞</div>
            <div>女士石英表手链女表</div>
            <div>三合一眉笔+眉粉+眉刷三用双头</div>
            <div>大理石眼影盘大地色十二色</div>
            <div>cc棒遮瑕保湿美白提亮肤色气垫BB霜</div>
            <div>洗脸刷硅胶洁面仪</div>
            <div>美甲工具套装</div>
            <div>纯棉全棉成人吸水家用浴巾</div>
            <div>小夹板两用头发蓬松卷发棒</div>
          </div>
        </Modal>
      </div>
    )
  }
}

HomePage.propTypes = {}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(HomePage)
