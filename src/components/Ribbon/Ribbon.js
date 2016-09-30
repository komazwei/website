/* @flow */
import React, { PropTypes } from "react"
import classNames from "classnames"
import { Header, IconButton } from "react-mdl"
import { Link } from "react-router"
import styles from "./Ribbon.scss"

const Ribbon = ({ title, link, back }) => {

  const backIcon = back
  ? <IconButton name="arrow_back" />
  : null

  const headerTitle = (
    <Link to={ link }>
      { backIcon }
      { title }
    </Link>
  )

  return (
    <div
      className={ classNames(styles.container) }
    >
      <Header
        className={ classNames(styles.header) }
        title={ headerTitle }
        scroll
      />
      <div
        className={ classNames(styles.ribbon) }
      />
    </div>
  )
}

Ribbon.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  back: PropTypes.bool,
}

export default Ribbon
