import { Component } from "react"
import { connect } from "dva"
import styles from "./More.scss"
import more from '../../assets/Img/crystal/more.png'

class More extends Component {
  render() {
    return (
      <div className={styles.page}>
        <img src={more} alt="img"/>
      </div>
    );
  }
}

More.propTypes = {};

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(More);
