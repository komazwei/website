/* @flow */
import React, { PropTypes } from "react"
import { Link } from "react-router"
import classNames from "classnames"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Page from "../Page"
import Ribbon from "../../components/Ribbon"
import { Content, Grid, Cell } from "react-mdl"
import FAQAccordion from "./FAQAccordion"
import styles from "./Docs.less"

const Docs = (props, { collection }) => {

  const apps = enhanceCollection(collection, {
    filter: { layout: "GuideIndex" },
    sort: "index"
  })

  const faqs = props.head.faq

  return (
    <Page { ...props }>
      <Ribbon
        title={ props.head.title }
        link={ props.__url }
      />
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
            <section className={ classNames(styles.apps) }>
              <Grid className={ classNames(styles.list) }>
                { apps.map((app) => (
                  <Cell
                    col={ 3 }
                    key={ app.__url }
                    className={ classNames(styles.item) }
                  >
                    <Link to={ app.__url }>
                      <img src={ app.image }></img>
                      <h3>{ app.title }</h3>
                    </Link>
                  </Cell>
                  ))
                }
              </Grid>
            </section>
            <section className={ classNames(styles.faqSection) }>
              <h3>
                { "FAQs" }
              </h3>
              { faqs.map((faq) => (
                <FAQAccordion
                  key={ faq.slug }
                  question={ faq.question }
                  answer={ faq.answer }
                />
              )) }
            </section>
          </Cell>
        </Grid>
      </Content>
    </Page>
  )
}

Docs.propTypes = {
  head: PropTypes.object.isRequired,
  __url: PropTypes.string
}

Docs.contextTypes = {
  collection: PropTypes.array.isRequired
}

export default Docs
