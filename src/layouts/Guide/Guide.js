import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import { Link } from "react-router"
import cx from "classnames"
import enhanceCollection from "phenomic/lib/enhance-collection"

// import {Content, Grid, Cell} from "react-mdl"
import AppBar from "../../components/AppBar"
import SiteFooter from "../../components/SiteFooter"

import styles from "./Guide.scss"

export default class Guide extends Component {
  static propTypes = {
    __url: PropTypes.string.isRequired,
    __filename: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    //rawBody: PropTypes.string.isRequired,
  }

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    collection: PropTypes.array,
  }

  render() {
    const {
      collection,
    } = this.context

    const {
      __url,
      head,
      body,
    } = this.props

    const {
      pkg,
    } = this.context.metadata

    return (
      <div>
        <Helmet
          title={ head.title }
          meta={ [
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary" },
            { property: "og:title", content: head.title },
            { name: "twitter:title", content: head.title },
            { property: "og:description", content: head.description },
            { name: "twitter:description", content: head.description },
            { property: "og:url", content: pkg.homepage + __url },
            // { property: "og:image", content: header.image },
            // { name: "twitter:image", content: header.image },
            { name: "twitter:creator", content: `@${ head.twitter }` },
          ] }
        />
        <div>
          <div className={ cx(styles.appbarContainer) }>
            <div className={ cx(styles.appbar) }>
              { enhanceCollection(collection, {
                filter: { layout: "GuideIndex", app: head.app },
                limit: 1,
              })
                .map((item) => {
                  return (
                    <AppBar key={ item.app } url={ item.__url } title={ item.title } />
                  )
                })
              }
            </div>
          </div>
          <div className={ cx(styles.content) }>
            <section className={ cx(styles.primaryContainer) }>
              <div className={ cx(styles.pageWidthContainer) }>
                <article className={ cx(styles.page) }>
                  <div className={ cx(styles.articleContainer) }>
                    <div className={ cx(styles.articleTitle) }>{ head.title }</div>
                    <div dangerouslySetInnerHTML={ { __html: body } } />
                  </div>
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
                              sort: "index",
                            })
                            .map((item) => {
                              return (
                                <li key={ item.__url }>
                                  <Link
                                    to={ item.__url }
                                    className={ cx(styles.siblingLink) }
                                    activeClassName={ cx(styles.siblingLinkCurrent) }
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
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }
}
