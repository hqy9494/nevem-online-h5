import { Component } from "react";
import { connect } from "dva";
import styles from "./BookPage.scss";
import Clipboard from 'clipboard';
import { Toast } from "antd-mobile";
import qr from "../../assets/Img/book-qr.jpg";

class BookPage extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: "award/getBooks"
    });
  }

  render() {
    const { books=[] } = this.props;

    const clipboard = new Clipboard('.copy', {
      text: (trigger)=> {
        return trigger.getAttribute('data-code');
      }
    })
    clipboard.on('success', function(e) {
      Toast.info('复制成功', 1)
    })
    clipboard.on('error', function(e) {
      Toast.info('复制失败', 1)
    })

    return (
      <div className={styles.wrap}>
        <div className={styles.top} />
        <div className={styles.list}>
          {books.map(b => {
            return (
              <div className={styles.item} key={b.id}>
                <div className={styles.itemLeft}>
                  <div>
                    <span>
                      <sup>￥</sup>
                      {b.value}
                    </span>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.itemDesc}>
                    <p>
                      兑换码：
                      <span className="copy" data-code={b.code}>{b.code}</span>
                    </p>
                    <span>长按关注公众号，输入兑换码即可</span>
                  </div>
                  <img src={qr} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.award.books
  };
};

export default connect(mapStateToProps)(BookPage);
