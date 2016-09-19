/* @flow */
import React, { Component, PropTypes } from "react"
import cx from "classnames"
import { Link } from "react-router"

import styles from "./Hero.scss"

export default class Hero extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string/* .isRequired */,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string/* .isRequired */,
    className: PropTypes.string,
  };

  render() {
    const ctaButtonClasses = cx(
      "mdl-button",
      "mdl-js-button",
      "mdl-js-ripple-effect",
      "mdl-button--raised",
      "mdl-button--accent"
    )

    const fabButtonClasses = cx(
      "mdl-button",
      "mdl-js-button",
      "mdl-button--fab",
      "mdl-js-ripple-effect"
    )

    return (
      <div className={ cx(styles.hero) }>
        <div className={ cx(styles.container) }>
          <div className={ cx(styles.overlay) }>
            <h1>{ this.props.head.title }</h1>
            <p>{ this.props.head.title }</p>
            <Link to={ "/" } className={ cx(ctaButtonClasses, styles.cta) }>
              { this.props.head.heroCTA }
            </Link>
          </div>
        </div>
        <Link to={ "/" } className={ cx(fabButtonClasses, styles.fab) }>
          <i className={ "material-icons" }>
            { "expand_more" }
          </i>
        </Link>
      </div>
    )
  }
}
