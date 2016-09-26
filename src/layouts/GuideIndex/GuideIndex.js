/* @flow */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
// import { Link } from "react-router"
// import enhanceCollection from "phenomic/lib/enhance-collection"
import SiteFooter from "../../components/SiteFooter"
import TopicAccordion from "./TopicAccordion"
import AppBar from "../../components/AppBar"
// import PagesList from "../../components/PagesList"
import cx from "classnames"

import styles from "./GuideIndex.scss"

export default class GuideIndex extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string/* .isRequired */,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string/* .isRequired */,
    className: PropTypes.string,
  }

  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div>
        <Helmet
          title={ this.props.head.title + " Help" }
        />
        <AppBar key={ this.props.head.name } url={ this.props.__url } title={ this.props.head.title } />
        <div className={ cx(styles.content) }>
          <section className={ cx(styles.primaryContainer) }>
            <div className={ cx(styles.pageWidthContainer) }>
              <div className={ cx(styles.page) }>
                <nav>
                  <h3>{ "Welcome to the Agrista " }{ this.props.head.title }{ " Help Center" }</h3>
                  { this.props.head && this.props.head.topics &&
                    this.props.head.topics.map((topic) => (
                      <TopicAccordion key={ topic.name } title={ topic.title } topic={ topic.name } />
                    ))
                  }
                </nav>
              </div>
            </div>
          </section>
          <SiteFooter />
        </div>
      </div>
    )
  }
}
