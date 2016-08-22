import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"

import {
  Header, Navigation,
} from "react-mdl"

import styles from "./Navbar.scss"

export default class Navbar extends Component {

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const headerClasses = cx(
      styles.header
    )

    return (
      <Header className={ headerClasses }>
        <Navigation>
          <Link to="/" activeClassName="active">
            { "Home" }
          </Link>
          <Link to="/services" activeClassName="active">
            { "Services" }
          </Link>
          <Link to="/partners" activeClassName="active">
            { "Partners" }
          </Link>
          <Link to="/docs" activeClassName="active">
            { "Docs" }
          </Link>
          <Link to="/blog" activeClassName="active">
            { "Blog" }
          </Link>
          <Link to="/contact" activeClassName="active">
            { "Contact Us" }
          </Link>
        </Navigation>
      </Header>
    )
  }
}
