/* @flow */
import React, { PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"
import { BodyContainer } from "phenomic"
import enhanceCollection from "phenomic/lib/enhance-collection"

// import {Content, Grid, Cell} from "react-mdl"
import Ribbon from "../../components/Ribbon"
// import SiteFooter from "../../components/SiteFooter"

import styles from "./Guide.less"

const Guide = (props,context) => {

  const {
    collection
  } = context

  const {
    head,
    body
  } = props

  const markdown = (
    <BodyContainer>
      { body }
    </BodyContainer>
  )

  return (
    <div>
      { enhanceCollection(collection, {
        filter: { layout: "GuideIndex", app: head.app },
        limit: 1
      })
        .map((item) => {
          return (
            <Ribbon
              key={ item.app }
              link={ item.__url }
              title={ item.title }
              back
            />
          )
        })
      }
      <div className={ cx(styles.content) }>
        <section className={ cx(styles.primaryContainer) }>
          <div className={ cx(styles.pageWidthContainer) }>
            <article className={ cx(styles.page) }>
              <section className={ cx(styles.articleContainer) }>
                <div
                  className={ cx(styles.articleTitle) }
                >
                  { head.title }
                </div>
                { markdown }
              </section>
            </article>
            <div>
              <div className={ cx(styles.primaryNav) }>
                <nav>
                  <div className={ cx(styles.siblingNav) }>
                    <h4 className={ cx(styles.titleLink) }>
                      { "Help" }
                    </h4>
                    <ul className={ cx(styles.siblingList) }>
                      {
                        enhanceCollection(collection, {
                          filter: { layout: "Guide", topic: head.topic },
                          sort: "index"
                        })
                        .map((item) => {
                          return (
                            <li key={ item.__url }>
                              <Link
                                to={ item.__url }
                                className={ cx(styles.link) }
                                activeClassName={ cx(styles.linkCurrent) }
                              >
                                { item.title }
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section />
      </div>
    </div>
  )
}

Guide.propTypes = {
  __url: PropTypes.string.isRequired,
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired
  //rawBody: PropTypes.string.isRequired,
}

Guide.contextTypes = {
  metadata: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  collection: PropTypes.array
}

export default Guide
