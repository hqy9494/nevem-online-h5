import { Component } from 'react'
import styles from './Nav.scss'
import PropTypes from 'prop-types'
import { NavBar, Icon } from 'antd-mobile'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { isLeft, isRight, title, history } = this.props
    return (
      <div className={styles.wrap}>
        <NavBar
          mode="dark"
          className={styles.nav}
          onLeftClick={() => {
            history.goBack()
          }}
          leftContent={isLeft ? <Icon type="left" /> : ''}
          rightContent={
            isRight ? 
            isRight === true ?
            <Icon type="ellipsis" onClick={() => {
              history.push('/')
            }}/> : 
            isRight :
            ''
          }
        >{title}</NavBar>
      </div>
    )
  }
}

Nav.propTypes = {
  title: PropTypes.string,
  isLeft: PropTypes.bool,
  // isRight: PropTypes.bool,
}

export default Nav
