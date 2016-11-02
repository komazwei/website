/* @flow */
import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"

import styles from "./Accordion.less"

export default class Accordion extends Component {

  static propTypes = {
    summary: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      active: false,
    }
  }

  handleToggle = () =>  {
    this.setState({
      active: !this.state.active,
    })
  }

  render() {
    const stateStyle = this.state.active ? styles.active : styles.inactive

    return (
      <section className={ cx(styles.parent) }>
        <section cl
        <h2 onClick={ this.handleToggle }>{ this.props.summary }</h2>
        <div className={ cx(styles.overflow, stateStyle) }>
          <div className={ cx(styles.children) }>
            <div className={ cx(styles.child) }>
              <Link to={ "accounts" }>
                { this.props.details }
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
