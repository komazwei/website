/* @flow */
import React, { Component, PropTypes } from "react"
import { Link } from "react-router"

import styles from "./index.css"

export default class Header extends Component {

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    return (
      <header className={ styles.header }>
        <nav className={ styles.nav }>
          <div className={ styles.navPart1 }>
            <Link
              className={ styles.link }
              to="/"
            >
              { "Home" }
            </Link>
          </div>
          <div className={ styles.navPart2 }>
            <Link
              className={ styles.link }
              to="/services"
            >
              { "Services" }
            </Link>
            <Link
              className={ styles.link }
              to="/partners"
            >
              { "Partners" }
            </Link>
            <Link
              className={ styles.link }
              to="/docs"
            >
              { "Docs" }
            </Link>
            <Link
              className={ styles.link }
              to="/blog"
            >
              { "Blog" }
            </Link>
            <Link
              className={ styles.link }
              to="/contact"
            >{ "Contact Us" }
            </Link>
          </div>
        </nav>
      </header>
    )
  }
}
