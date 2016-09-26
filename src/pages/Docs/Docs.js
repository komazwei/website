/* @flow */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import enhanceCollection from "phenomic/lib/enhance-collection"
import cx from "classnames"

// import Page from "../Page"
import AppBar from "../../components/AppBar"
import Footer from "../../components/Footer"
import AppCards from "./AppCards"
import FAQAccordion from "./FAQAccordion"

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

    const faqs = head.faq

    return (
      <div>
        <Helmet
          title={ head.title }
        />
        <AppBar key={ head.name } url={ __url } title={ "Agrista" } />
        <div className={ cx(styles.content) }>
          <div className={ cx(styles.primaryContainer) }>
            <div className={ cx(styles.pageWidthContainer) }>
              <div className={ cx(styles.page) }>
                <section className={ cx(styles.apps) } >
                  <AppCards apps={ apps } />
                </section>
                <section className={ cx(styles.faqSection) }>
                  <h3>FAQs</h3>
                  { faqs.map((faq) => (
                    <FAQAccordion key={ faq.slug } question={ faq.question } answer={ faq.answer } />
                  )) }
                </section>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
