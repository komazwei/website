import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import cx from "classnames"

// import Page from "../Page"
import AppBar from "../../components/AppBar"
import AppCards from "../../components/AppCards"
import FAQAccordion from "./FAQAccordion"
import SiteFooter from "../../components/SiteFooter"

import styles from "./Docs.scss"

export default class Docs extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { props } = this

    const {
      // __filename,
      __url,
      head,
      //body,
      //header,
      //footer,
    } = props

    const apps = enhanceCollection(this.context.collection, {
      filter: { layout: "GuideIndex" },
      sort: "index",
    })

    return (
      <div>
        <AppBar key={ head.name } url={ __url } title={ "Agrista" } />
        <div className={ cx(styles.content) }>
          <section className={ cx(styles.primaryContainer) }>
            <div className={ cx(styles.pageWidthContainer) }>
              <div className={ cx(styles.page) }>
                <AppCards apps={ apps } />
                <FAQAccordion questions={ head.faq } />
              </div>
            </div>
          </section>
          <SiteFooter />
        </div>
      </div>
    )
  }
}
