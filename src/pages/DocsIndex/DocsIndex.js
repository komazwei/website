import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import classNames from "classnames"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Footer from "../../components/Footer"
import Ribbon from "../../components/Ribbon"
import { Content, Grid, Cell } from "react-mdl"
import AppCards from "./AppCards"
import FAQAccordion from "./FAQAccordion"
import styles from "./DocsIndex.scss"

export default class DocsIndex extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { props } = this

    const { head } = props

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
        <Ribbon title={ head.title } />
        <Content className={ classNames(styles.main) }>
          <Grid className={ classNames(styles.container) }>
            <Cell
              col={ 2 }
              hidePhone
              hideTablet
            />
            <Cell
              col={ 8 }
              shadow={ 2 }
              className={ classNames(styles.content, "mdl-color--white") }
            >
              <section className={ classNames(styles.apps) } >
                <AppCards apps={ apps } />
              </section>
              <section className={ classNames(styles.faqSection) }>
                <h3>FAQs</h3>
                { faqs.map((faq) => (
                  <FAQAccordion key={ faq.slug } question={ faq.question } answer={ faq.answer } />
                )) }
              </section>
            </Cell>
          </Grid>
          <Footer />
        </Content>
      </div>
    )
  }
}
