import { Component } from 'react';
import { connect } from 'dva';
import styles from './addressDetails.scss';
import Nav from '../../components/Common/Nav/Nav';
import { List, InputItem, TextareaItem, Picker } from 'antd-mobile';
import china from './china';
import { createForm } from 'rc-form';
import { Toast } from 'antd-mobile';

class AddressDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeName = this.onChange.bind(this, 'userName');
    this.onChangePhone = this.onChange.bind(this, 'telNumber');
    this.onChangeAddress = this.onChange.bind(this, 'detailInfo');
    this.onChangeDistrict = this.onChange.bind(this, 'addressArr');
    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    this.setState({ addressDetails: this.props.addressDetails });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id !== 'new'
    ) {
      this.setState({ addressDetails: nextProps.addressDetails });
    }
  }

  onChange(field, value) {
    this.setState({ [field]: value });
  }

  submit() {

    let { params } = this.props;
    if(!params) params = {};
    let { fromcheck, slot } = params;

    this.props.form.validateFields((error, values) => {
      if (!error) {
        let userName = values.userName.replace(/^\s+|\s+$/g, '');
        let telNumber = values.telNumber.replace(/^\s+|\s+$/g, '');
        let detailInfo = values.detailInfo.replace(/^\s+|\s+$/g, '');

        if(!/^1[34578]\d{9}$/.test(telNumber)){
          Toast.info('请输入正确的手机号码', 1);
          return;
        }
        if(!userName || userName.length > 8){
          Toast.info('请输入正确的收货人', 1);
          return;
        }
        if(!detailInfo){
          Toast.info('请输入正确的详细地址', 1);
          return;
        }
        let payload = {
          userName: userName,
          telNumber: telNumber,
          detailInfo: detailInfo,
          provinceName: values.addressArr[0],
          cityName: values.addressArr[1],
          districtName: values.addressArr[2]
        };

        if (fromcheck) {
          payload.isDefault = true;
        }

        if (
          this.props.match.params &&
          this.props.match.params.id &&
          this.props.match.params.id !== 'new'
        ) {
          payload.id = this.props.match.params.id;
          this.props.dispatch({
            type: 'address/update',
            payload
          });
        } else {
          this.props.dispatch({
            type: 'address/create',
            payload
          });
        }
        setTimeout(() => {
          if (
            fromcheck &&
            slot
          ) {
            this.props.history.replace(
              `/orderCheck?slot=${slot}`
            );
          } else {
            this.props.history.goBack();
          }
          // this.props.history.replace("/address");
        }, 200);
      } else {
        Toast.info('请输入正确的收货信息', 1);
      }
    });
  }

  delete(id) {
    if (
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id !== 'new'
    ) {
      this.props
        .dispatch({
          type: 'address/delete',
          payload: { id: this.props.match.params.id }
        })
        .then(result => {
          if (result) {
            this.props.history.goBack();
          }
        });
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { name } = this.props;
    const { addressDetails } = this.state;
    let addressArr;

    if (
      addressDetails &&
      addressDetails.provinceName &&
      addressDetails.cityName &&
      addressDetails.districtName
    ) {
      addressArr = [
        addressDetails.provinceName,
        addressDetails.cityName,
        addressDetails.districtName
      ];
    }

    return (
      <div className={styles.wrap}>
        <Nav title={name} history={this.props.history} isLeft={true} />
        <div className={styles.form}>
          <List>
            <InputItem
              {...getFieldProps('userName', {
                initialValue: addressDetails && addressDetails.userName,
                rules: [{ required: true }]
              })}
              placeholder="请输入收货人真实姓名"
              clear
            >
              收货人
            </InputItem>
            <InputItem
              {...getFieldProps('telNumber', {
                initialValue: addressDetails && addressDetails.telNumber,
                rules: [{ required: true }]
              })}
              placeholder="请输入收货人手机号"
              clear
            >
              联系方式
            </InputItem>
          </List>
          <List style={{ marginTop: '3vw' }}>
            <Picker
              {...getFieldProps('addressArr', {
                initialValue: addressArr,
                rules: [{ required: true }]
              })}
              extra="请选择地区信息"
              data={china}
            >
              <List.Item arrow="horizontal">地区信息</List.Item>
            </Picker>
            <TextareaItem
              title="详细地址"
              {...getFieldProps('detailInfo', {
                initialValue: addressDetails && addressDetails.detailInfo,
                rules: [{ required: true }]
              })}
              placeholder="请输入收货人详细地址"
              rows={3}
              autoHeight
            />
          </List>

          <a
            className={styles.submit}
            href="javascript:;"
            onClick={this.submit}
          >
            保存
          </a>
          {this.props.match.params &&
            this.props.match.params.id &&
            this.props.match.params.id !== 'new' && (
              <a
                className={styles.remove}
                href="javascript:;"
                onClick={this.delete}
              >
                删除
              </a>
            )}
        </div>
      </div>
    );
  }
}

AddressDetails.propTypes = {};

const mapStateToProps = state => {
  return {
    addressDetails: state.address.addressDetails
  };
};

const WrapperAddressDetails = createForm()(AddressDetails);

export default connect(mapStateToProps)(WrapperAddressDetails);
