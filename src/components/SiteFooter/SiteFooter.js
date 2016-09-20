import React, { Component } from "react"
import cx from "classnames"
// import { Link } from "react-router"
import { Footer,
  FooterSection,
  FooterLinkList } from "react-mdl"

import styles from "./SiteFooter.scss"

// import styles from "./SiteFooter.scss"

export default class SiteFooter extends Component {
  render() {
    return (
      <Footer size="mini" className={ cx(styles.footer) }>
        <FooterSection type="left" logo="" className={ cx(styles.logo) }>
          <FooterLinkList>
            <span className={ cx(styles.logo) }>©2016 Agrista</span>
            <a href="/docs">Help</a>
            <a href="#">Privacy & Terms</a>
          </FooterLinkList>
        </FooterSection>
      </Footer>
    )
  }
}
