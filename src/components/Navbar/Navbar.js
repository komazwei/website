/* @flow */
import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"
import Svg from "react-svg-inline"

import agristaLogo from "../../../content/images/agrista-logo.svg"
import {
  Header, Navigation,
} from "react-mdl"

import styles from "./Navbar.scss"

export default class Navbar extends Component {

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {

    return (
      <Header
        title={
          <Link to="/">
            <Svg
              svg={ agristaLogo }
              height="42px"
              width="148px"
            />
          </Link>
        }
        className={ cx(styles.header) }
      >
        <Navigation>
          <Link to="/docs" className={ cx(styles.link) } activeClassName="active">
            { "Docs" }
          </Link>
          <Link to="/blog" className={ cx(styles.link) } activeClassName="active">
            { "Blog" }
          </Link>
          <Link to="/contact" className={ cx(styles.link) } activeClassName="active">
            { "Contact Us" }
          </Link>
        </Navigation>
      </Header>
    )
  }
}
