/* @flow */
import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Page from "../Page"
import PagesList from "../../components/PagesList"

export default class Docs extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const apps = enhanceCollection(this.context.collection, {
      filter: { layout: "GuideIndex" },
      sort: "index",
    })

    const faq = enhanceCollection(this.context.collection, {
      filter: { layout: "FAQ" },
      sort: "index",
    })

    return (
      <Page { ...this.props}>
        <h2>{ "Apps" }</h2>
        <PagesList pages={ apps } />
        <h2>{ "FAQ" }</h2>
        <PagesList pages={ faq } />
      </Page>
    )
  }
}
