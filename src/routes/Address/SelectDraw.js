
import { Component } from "react";
import { connect } from "dva";
import styles from "./addressList.scss";
import Nav from "../../components/Common/Nav/Nav";
import noAddress from "../../assets/Img/noAddress.png";
import Item from "./AddressItem";

const NoData = ({ history, openAddress }) => (
  <div className={styles.noData}>
    <img src={noAddress} />
    <span>暂无收货地址，立刻添加体验更好购物体验。</span>
    <div className={styles.noDataAdd}>
      <a
        onClick={() => {
          history && history.push("/address/new");
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
    <a
      className={styles.addNew}
      onClick={() => {
        history && history.push("/address/new");
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
      selectAddressId: null
    };
    this.openAddress = this.openAddress.bind(this);
  }

  openAddress() {
    let url = window.location.href.split("#")[0];
    this.props
      .dispatch({
        type: "address/wxAddressConfig",
        payload: {
          url
        }
      })
      .then(wxConfig => {
        wx.config(wxConfig); // eslint-disable-line

        wx.ready(() => {// eslint-disable-line
          

          wx.openAddress({// eslint-disable-line
            

            success: data => {
              let payload = {
                userName: data.userName,
                telNumber: data.telNumber,
                detailInfo: data.detailInfo,
                provinceName: data.provinceName,
                cityName: data.cityName,
                districtName: data.countryName
              };

              this.props
                .dispatch({
                  type: "address/create",
                  payload
                })
                .then(res => {
                  this.props.dispatch({
                    type: "address/getAddress"
                  });
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
    let { params } = this.props;
    if(!params) params = {};
    let { id, formMy } = params;

    if (address && id) {
      this.props
        .dispatch({
          type: "address/setAddressDraw",
          payload: { id, addressId: address.id }
        })
        .then(() => {
          if (formMy) {
            this.props.history.goBack();
          } else {
            this.props.history.push("/selectDrawAddress/success");
          }
        });
    }
  };

  render() {
    let { name, addressList, params } = this.props;
    if(!params) params = {};
    let { id } = params;

    return (
      <div className={styles.wrap}>
        <Nav title={name} history={this.props.history} isLeft={true} />
        {addressList &&
          addressList.length > 0 &&
          addressList.map((a, i) => (
            <Item
              key={a.id}
              data={a}
              onSelect={() => {
                this.setState(
                  {
                    selectAddressId: a.id
                  },
                  () => {
                    setTimeout(() => {
                      this.selectAddress(a);
                    }, 300);
                  }
                );
              }}
              onEdit={() => {
                this.props.history.push(
                  `/address/${a.id}?drawId=${id}`
                );
              }}
              type={"select"}
              checked={(() => {
                if (
                  (this.state.selectAddressId &&
                    this.state.selectAddressId === a.id) ||
                  (!this.state.selectAddressId && i === 0)
                ) {
                  return true;
                }
                return false;
              })()}
            />
          ))}
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
    addressList: state.address.addressList
  };
};

export default connect(mapStateToProps)(AddressList);
