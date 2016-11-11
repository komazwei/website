/* @flow */
import React from "react"
import { Link } from "react-router"
//import cx from "classnames"
//import Svg from "react-svg-inline"

//import agristaLogo from "../../../content/images/agrista-logo.svg"
//import {
//  Header, Navigation, IconButton, Menu, MenuItem,
//} from "react-mdl"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { Header, Brand, Toggle, Collapse } from "react-bootstrap/lib/Navbar"
import { LinkContainer } from "react-router-bootstrap"

//import styles from "./SiteHeader.scss"

const SiteHeader = () => {

  return (
      <Navbar fixedTop>
        <Header>
          <Link to="/">
            <Brand>
              <div>
                <img
                  alt="Agrista Logo"
                  src="/images/logo-agrista-1x.png"
                  srcSet="/images/logo-agrista-1x.png, /images/logo-agrista-2x.png 2x"
                />
              </div>
            </Brand>
          </Link>
          <Toggle />
        </Header>
        <Collapse className="bs-navbar-collapse">
          <Nav pullRight>
            <LinkContainer to="/docs">
              <NavItem>
                Docs
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/blog">
              <NavItem>
                Blog
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/contact">
              <NavItem>
                Contact Us
              </NavItem>
            </LinkContainer>
          </Nav>
        </Collapse>
      </Navbar>
    )
}

export default SiteHeader
