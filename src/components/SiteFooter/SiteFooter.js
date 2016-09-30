import React from "react"
import { Link } from "react-router"
import cx from "classnames"
import { Footer, FooterSection, FooterLinkList } from "react-mdl"
import styles from "./SiteFooter.scss"

const SiteFooter = () => {

  return (
    <Footer
      size={ "mini" }
      className={ cx(styles.footer) }
    >
      <FooterSection type="left" logo={ "©2016 Agrista" }>
        <FooterLinkList>
          <Link to={ "/docs" }>{ "Help" }</Link>
          <Link to={ "/privacy" }>{ "Privacy" }</Link>
          <Link to={ "/terms" }>{ "Terms" }</Link>
        </FooterLinkList>
      </FooterSection>
    </Footer>
  )
}

export default SiteFooter
