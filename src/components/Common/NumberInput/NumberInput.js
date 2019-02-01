import {Component} from 'react'
import styles from './NumberInput.scss'
import { InputItem } from 'antd-mobile'

class NumberInput extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    const {isFocus} = this.props
    isFocus && setTimeout(() => {
      this.inputRef.focus()
    }, 0)
  }
  handleClick = () => {
    this.inputRef.focus()
  }
  render() {
    const {render, onChange, value, maxLength} = this.props

    return (
      <div className={styles.wrap} onClick={this.handleClick}>
        {
          render && render()
        }
        <InputItem
          type='money'
          className={styles.NumberInput}
          ref={el => this.inputRef = el}
          onChange={onChange}
          value={value}
          maxLength={maxLength}
        >光标在左</InputItem>
      </div>
    )
  }
}

NumberInput.propTypes = {}

export default NumberInput
