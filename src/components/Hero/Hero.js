/* @flow */
import React, { Component, PropTypes } from "react"
import classNames from "classnames"
import { Link } from "react-router"
import { Grid, Cell } from "react-mdl"

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
    const ctaButtonClasses = classNames(
      "mdl-button",
      "mdl-js-button",
      "mdl-js-ripple-effect",
      "mdl-button--raised",
      "mdl-button--accent",
    )

    const fabButtonClasses = classNames(
      "mdl-button",
      "mdl-js-button",
      "mdl-button--fab",
      "mdl-js-ripple-effect",
      "mdl-shadow--4dp"
    )

    return (
      <div className={ classNames(styles.hero) }>
        <div className={ classNames(styles.container) }>
          <div className={ classNames(styles.overlay) }>
            <Grid>
              <Cell
                col={ 6 }
                className={ classNames(styles.heroBlock) }
              >
                <h1>
                  { this.props.head.title }
                </h1>
                <Link to={ "/" } className={ classNames(ctaButtonClasses, styles.cta) }>
                  { this.props.head.heroCTA }
                </Link>
              </Cell>
            </Grid>
          </div>
        </div>
        <Link to="#feature" className={ classNames(fabButtonClasses, styles.fab) }>
          <i className={ "material-icons" }>
            { "expand_more" }
          </i>
        </Link>
      </div>
    )
  }
}
