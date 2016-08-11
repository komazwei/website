/* @flow */
import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Page from "../Page"
import PagesList from "../../PagesList"

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

  get collection() {
    return enhanceCollection(this.context.collection, {
      /* filter: (t) => {
        const isGuide = t.layout === "Guide"
        const appName = t.app === "farm-map"
        return (appName && isGuide)
      },*/
      filter: { layout: "Guide", app: this.props.head.app },
      sort: "index",
    })
  }

  render() {
    console.log(this)
    return (
      <Page { ...this.props}>
        <h2>{ "Guides for: " } { this.props.head.app }</h2>
        <PagesList pages={ this.collection } />
      </Page>
    )
  }
}
