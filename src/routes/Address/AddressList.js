import { Component } from 'react';
import { connect } from 'dva';
import styles from './addressList.scss';
import Nav from '../../components/Common/Nav/Nav';
import { Flex } from 'antd-mobile';

import common from '../../common/common';

import noAddress from '../../assets/Img/noAddress.png';
import Item from './AddressItem';

const NoData = ({ history, openAddress }) => (
  <div className={styles.noData}>
    <img src={noAddress} />
    <span>暂无收货地址，立刻添加体验更好购物体验。</span>
    <div className={styles.noDataAdd}>
      <a
        onClick={() => {
          history && history.push('/address/new');
        }}
        href="javascript:;"
      >
        添加地址
      </a>
      <a
        onClick={openAddress}
        style={{ marginLeft: "5vw" }}
        href="javascript:;"
      >
        获取微信收货地址
      </a>
    </div>
  </div>
);

const Add = ({ history, openAddress }) => (
  <div className={styles.add}>
    <a className={styles.addNew}
      onClick={() => {
        history && history.push('/address/new');
      }}
      href="javascript:;"
    >
      新增收货地址
    </a>
    <a className={styles.addWx} onClick={openAddress} href="javascript:;">
      获取微信收货地址
    </a>
  </div>
);

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
    this.openAddress = this.openAddress.bind(this);
  }

  componentWillMount(){

    if(this.props.params && this.props.params.token){
      // this.props.dispatch({
      //   type: 'account/openidLogin',
      //   payload: {
      //     token: this.props.params.token
      //   }
      // }).then((user) => {
      //   if (user) {
      //     this.props.dispatch({
      //       type: 'address/getAddress'
      //     })
      //   };
      // });
    }else{
      this.props.dispatch({
        type: 'address/getAddress'
      })
    }

  }

  openAddress() {
    let url = window.location.href.split('#')[0];
    this.props
      .dispatch({
        type: 'address/wxAddressConfig',
        payload: {
          url
        }
      })
      .then(wxConfig => {
        wx.config(wxConfig); // eslint-disable-line

        wx.ready(() => { // eslint-disable-line
          wx.openAddress({ // eslint-disable-line
            success: data => {
              let payload = {
                userName: data.userName,
                telNumber: data.telNumber,
                detailInfo: data.detailInfo,
                provinceName: data.provinceName,
                cityName: data.cityName,
                districtName: data.countryName
              };

              this.props.dispatch({
                type: 'address/create',
                payload
              }).then((res)=>{
                this.props.dispatch({
                  type: 'address/getAddress'
                })
              });
            },
            cancel: e => {
              // alert('查询微信地址失败');
            }
          });
        });

        wx.error(e => {}); // eslint-disable-line
      });
  }

  selectAddress = address => {
    if (address) {
      this.props.dispatch({
        type: 'address/setAddress',
        payload: address
      });
      setTimeout(() => {
        // this.props.history.goBack();
        if (this.props.params&&this.props.params.slot) {
          this.props.history.replace(
            `/orderCheck?slot=${this.props.params.slot}`
          );
        } else {
          this.props.history.goBack();
        }
      }, 200);
    }
  };

  toEquipment=()=>{
    this.props.dispatch({
        type: 'account/getEquipmentToken',
      }).then(res=>{
        window.location.href = `${common.baseEquipmentURL}/static/wechat/${common.www}/myNewAddress.html?token=${res.id}`;
      })
  }

  render() {
    const { name, addressList } = this.props;
    return (
      <div className={styles.wrap}>
        <Nav title={name} history={this.props.history} isLeft={true} />
        <div className={styles.tabs}>
          <div className={styles.tab} onClick={this.toEquipment}><span>实体设备</span></div>
          <div className={`${styles.tab} ${styles.tabActive}`}><span>线上商城</span></div>
        </div>
        <div style={{marginTop: "4vw"}}>
          {addressList &&
          addressList.length > 0 &&
          addressList.map(a => (
            <Item
              key={a.id}
              data={a}
              onEdit={() => {
                this.props.history.push(`/address/${a.id}`);
              }}
              type={'list'}
            />
          ))}
        </div>
        {addressList &&
          addressList.length === 0 && (
            <NoData
              history={this.props.history}
              openAddress={this.openAddress}
            />
          )}
        {addressList &&
          addressList.length > 0 && (
            <Add history={this.props.history} openAddress={this.openAddress} />
          )}
      </div>
    );
  }
}

AddressList.propTypes = {};

const mapStateToProps = state => {
  return {
    selectedAddress: state.address.selectedAddress,
    addressList: state.address.addressList
  };
};

export default connect(mapStateToProps)(AddressList);
