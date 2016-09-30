/* @flow */
import React, { PropTypes } from "react"
import classNames from "classnames"
import { Link } from "react-router"
import { Grid, Cell } from "react-mdl"

import styles from "./Hero.scss"

const Hero = ({ title, cta }) => {
  const ctaButtonClasses = classNames(
    "mdl-button",
    "mdl-js-button",
    "mdl-js-ripple-effect",
    "mdl-button--raised",
    "mdl-button--accent"
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
                { title }
              </h1>
              <Link to={ "/contact" }
                className={ classNames(ctaButtonClasses, styles.cta) }
              >
                { cta }
              </Link>
            </Cell>
          </Grid>
        </div>
      </div>
      <Link to="#feature"
        className={ classNames(fabButtonClasses, styles.fab) }
      >
        <i className={ "material-icons" }>
          { "expand_more" }
        </i>
      </Link>
    </div>
  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
}

export default Hero
