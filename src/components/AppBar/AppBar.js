/* @flow */
import React, { PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"

import styles from "./AppBar.less"

const AppBar = ({ url,title }) => {
  return (
  <div className={ cx(styles.container) }>
    <div className={ cx(styles.bar) }>
      <Link to={ url } className={ cx(styles.title) }>
        { title } { "Help" }
      </Link>
    </div>
  </div>
  )
}

AppBar.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default AppBar
