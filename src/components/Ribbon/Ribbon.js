import React from "react"
import cx from "classnames"
import { Header } from "react-mdl"
import styles from "./Ribbon.scss"

const Ribbon = () => {
  return (
    <div>
      <Header
        className={ cx(styles.header) }
        title="Blog"
        scroll
      />
      <div className={ cx(styles.ribbon) } />
    </div>
  )
}

export default Ribbon
