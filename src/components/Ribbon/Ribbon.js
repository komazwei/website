/* @flow */
import React, { Component, PropTypes } from "react"
import classNames from "classnames"
import { Header, Icon } from "react-mdl"
import { Link } from "react-router"
import styles from "./Ribbon.scss"

export default class Ribbon extends Component {
  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
  }

  render() {
    const { title, link } = this.props

    const buttonClasses = classNames(
      "mdl-button",
      "mdl-js-button",
      "mdl-js-ripple-effect",
      "mdl-button--icon"
    )

    return (
      <div>
        <Header
          className={ classNames(styles.header) }
          scroll
          title={ title }
        >
          { link &&
            <Link
              to={ link }
              className={ buttonClasses }
            >
              <Icon name={ "arrow_back" } />
            </Link>
          }
        </Header>
        <div className={ classNames(styles.ribbon) } />
      </div>
    )
  }
}
