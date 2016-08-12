import React, { Component } from "react"
// import { Link } from "react-router"

import styles from "./Footer.css"

export default class Footer extends Component {

  render() {
    return (
      <footer className={ styles.footer }>
        <div
          href={ process.env.PHENOMIC_HOMEPAGE }
          className={ styles.link }
        >
          { "Copyright Agrista (Pty) Ltd 2016" }
        </div>
      </footer>
    )
  }
}
