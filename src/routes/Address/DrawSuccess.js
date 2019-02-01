import { Component } from 'react';
import { connect } from 'dva';
import styles from './DrawSuccess.scss';

import modal from '../../assets/Img/succ1-modal.png';

class DrawSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goback = this.goback.bind(this);
  }

  goback(e) {
    e.preventDefault();    
    this.props.history.push('/game');
  }

  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <div className={styles.modal}>
          <img src={modal} />
            <a className={styles.goback} onClick={this.goback} />
          </div>
        </div>
      </div>
    );
  }
}

DrawSuccess.propTypes = {};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DrawSuccess);
