import React, { PropTypes } from "react"
import styles from "./Tag.less"

const Tag = ({ name, ...props }) => {
  return (
    <span
      className={ styles.tag }
      {...props}
    >
      #{ name }
    </span>
  )
}

Tag.propTypes = {
  name: PropTypes.string,
}

export default Tag
