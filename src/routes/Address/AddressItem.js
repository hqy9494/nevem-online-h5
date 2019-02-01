import PropTypes from 'prop-types';
import styles from './addressItem.scss';

const AddressItem = ({ data, onSelect, onEdit,type, checked }) => {
  return (
    <div className={styles.item} style={type==="list"?{paddingLeft:"6vw"}:{}}>
      {type==="select"&&checked && <span className={styles.icon} />}
      <div onClick={onSelect}>
        <div>
          <span className={styles.name}>{data.userName}</span>
          <span className={styles.phone}>
            {data.telNumber.replace(/^(\d{4})\d{4}(\d+)/, '$1****$2')}
          </span>
        </div>
        <div className={styles.details}>
          {data.provinceName}
          {data.cityName}
          {data.districtName}
          {data.detailInfo}
        </div>
      </div>
      <a href="javascript:;" onClick={onEdit}>
        编辑
      </a>
    </div>
  );
};

AddressItem.defaultProps = {};

AddressItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    provinceName: PropTypes.string,
    cityName: PropTypes.string,
    districtName: PropTypes.string,
    detailInfo: PropTypes.string,
    telNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    userName: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    onSelect: PropTypes.func
  }).isRequired
};

export default AddressItem;
