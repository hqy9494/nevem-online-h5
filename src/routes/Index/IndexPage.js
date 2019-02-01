import { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss';
import i4 from '../../assets/Img/i4.png';

class IndexPage extends Component {
  state = {
    modal: false
  };
  handleModal = () => {
    this.setState({
      modal: true
    });
  };
  handleClose = () => {
    this.setState({
      modal: false
    });
  };
  toItem = name => {
    this.props.history.push(`/buy/${name}`);
  };
  render() {
    const arr = [
      {
        title: '01',
        name: '01'
      },
      {
        title: '02',
        name: '02'
      },
      {
        title: '03',
        name: '03'
      },
      {
        title: '04',
        name: '04'
      },
      {
        title: '05',
        name: '05'
      },
      {
        title: '06',
        name: '06'
      },
      {
        title: '07',
        name: '07'
      },
      {
        title: '08',
        name: '08'
      },
      {
        title: '09',
        name: '09'
      },
      {
        title: '10',
        name: '10'
      },
      {
        title: '11',
        name: '11'
      },
      {
        title: '12',
        name: '12'
      }
    ];
    return (
      <div className={styles.page}>
        <div className={styles.wrap}>
          <div className={styles.message} onClick={this.handleModal} />
          <div className={styles.box}>
            {arr &&
              arr.map((v, i) => (
                <div
                  className={styles.item}
                  key={i}
                  onClick={() => this.toItem(v.name)}
                />
              ))}
          </div>
        </div>
        {this.state.modal && (
          <div className={styles.modal} onClick={this.handleClose}>
            <div
              className={styles.tip}
              onClick={e => {
                e.stopPropagation();
                return;
              }}
            >
              <span className={styles.modalClose} onClick={this.handleClose} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

IndexPage.propTypes = {};

const mapStateToProps = state => {
  const { me } = state.account;

  return {
    me: localStorage.me ? JSON.parse(localStorage.me) : me
  };
};

export default connect(mapStateToProps)(IndexPage);
