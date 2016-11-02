/* @flow */
import React, { Component, PropTypes } from "react"
// import { Link } from "react-router"
// import enhanceCollection from "phenomic/lib/enhance-collection"
import cx from "classnames"

import styles from "./FAQAccordion.less"

export default class FAQAccordion extends Component {

  static propTypes = {
    // children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    // __filename: PropTypes.string/* .isRequired */,
    // __url: PropTypes.string.isRequired,
    // head: PropTypes.object.isRequired,
    // body: PropTypes.string/* .isRequired */,
    // className: PropTypes.string,
    // title: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }

  constructor() {
    super()
    this.state = {
      active: false
    }
  }

  handleToggle = () =>  {
    this.setState({
      active: !this.state.active
    })
  }

  render() {

    const stateStyle = this.state.active ? styles.active : styles.inactive

    return (
      <div className={ cx(styles.wrapper) }>
        <div className={ cx(styles.parent, stateStyle) }>
          <div className={ cx(styles.questionContainer) }>
            <a onClick={ this.handleToggle } className={ styles.question }>
              { this.props.question }
            </a>
          </div>
          <div className={ cx(styles.overflow) }>
            <div className={ cx(styles.content) } >{ this.props.answer }</div>
          </div>
        </div>
      </div>
    )
  }
}
