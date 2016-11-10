/* @flow */
import React from "react"
import { Link } from "react-router"
import cx from "classnames"
//import Svg from "react-svg-inline"

//import agristaLogo from "../../../content/images/agrista-logo.svg"
import {
  Header, Navigation, IconButton, Menu, MenuItem,
} from "react-mdl"

import styles from "./SiteHeader.scss"

const SiteHeader = () => {

  return (
      <Header
        title={
          <Link to="/">
            <img
              alt="Agrista Logo"
              src="/images/logo-agrista-1x.png"
              srcSet="/images/logo-agrista-1x.png, /images/logo-agrista-2x.png 2x"
            />
          </Link>
        }
        className={ cx(styles.header) }
      >
        <Navigation className={ cx(styles.navBar) }>
          <Link
            to="/docs"
            className={ cx(styles.link) }
            activeClassName="active"
          >
            { "Docs" }
          </Link>
          <Link
            to="/blog"
            className={ cx(styles.link) }
            activeClassName="active"
          >
            { "Blog" }
          </Link>
          <Link
            to="/contact"
            className={ cx(styles.link) }
            activeClassName="active"
          >
            { "Contact Us" }
          </Link>
        </Navigation>
        <Navigation
          className={ cx(styles.navMenu) }
        >
          <IconButton
            name={ "more_vert" }
            id={ "nav-menu" }
            ripple
            className={ cx(styles.menuBtn) }
          />
          <Menu
            target={ "nav-menu" }
            align={ "right" }
          >
            <Link
              to={ "/docs" }
              className={ cx(styles.menuLink) }
            >
              <MenuItem>
                { "Docs" }
              </MenuItem>
            </Link>
            <Link
              to={ "/blog" }
              className={ cx(styles.menuLink) }
            >
              <MenuItem>{ "Blog" }</MenuItem>
            </Link>
            <Link
              to={ "/contact" }
              className={ cx(styles.menuLink) }
            >
              <MenuItem>{ "Contact Us" }</MenuItem>
            </Link>
          </Menu>
        </Navigation>
      </Header>
    )
}

export default SiteHeader
