/* @flow */
import React from "react";
//import cx from "classnames";
import Svg from "react-svg-inline";
import agristaLogo from "../../../content/images/agrista-logo.svg";
//import { Navigation, IconButton, Menu, MenuItem } from "react-mdl";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Header, Brand, Toggle, Collapse } from "react-bootstrap/lib/Navbar"
import { LinkContainer } from "react-router-bootstrap"
//import { LinkContainer } from 'react-router-bootstrap';
//import styles from "./SiteHeader.less";

const SiteHeader = () => {

    return (
        <Navbar
          fixedTop
        >
          <Header>
            <LinkContainer to={ "/" }>
              <Brand>
                <Svg
                  svg={ agristaLogo }
                  height="42px"
                  width="148px"
                />
              </Brand>
            </LinkContainer>
            <Toggle />
          </Header>
          <Collapse
            className="bs-navbar-collapse"
          >
            <Nav
              pullRight
            >
              <LinkContainer
                to={ "/docs" }
              >
                <NavItem>
                  { "Docs" }

                </NavItem>
              </LinkContainer>
              <LinkContainer
                to="/blog"
              >
                <NavItem>
                  { "Blog" }
                </NavItem>
              </LinkContainer>
              <LinkContainer
                to="/contact"
              >
                <NavItem>
                  { "Contact Us" }
                </NavItem>
              </LinkContainer>
            </Nav>
          </Collapse>
        </Navbar>
    )
}

export default SiteHeader
