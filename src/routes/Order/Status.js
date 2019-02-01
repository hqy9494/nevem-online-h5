import {Component} from 'react'
import {connect} from 'dva'
import styles from './Status.scss'

class StatusPage extends Component {
  render() {
    return (
      <div className={styles.page}>
      </div>
    )
  }
}

StatusPage.propTypes = {}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(StatusPage)
