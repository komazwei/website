import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"

import {
  Header, Navigation,
} from "react-mdl"

import styles from "./Header.scss"

export default class NavHeader extends Component {

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const headerClasses = cx(
      styles.header
    )

    return (
      <Header transparent waterfall className={ headerClasses }>
        <Navigation>
          <Link to="/">
            { "Home" }
          </Link>
          <Link to="/services">
            { "Services" }
          </Link>
          <Link to="/partners">
            { "Partners" }
          </Link>
          <Link to="/docs">
            { "Docs" }
          </Link>
          <Link to="/blog">
            { "Blog" }
          </Link>
          <Link to="/contact">
            { "Contact Us" }
          </Link>
        </Navigation>
      </Header>
    )
  }
}
