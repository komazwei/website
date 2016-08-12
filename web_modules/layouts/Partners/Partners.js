// @flow
import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Page from "../Page"
import PagesList from "../../components/PagesList"

export default class Partners extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const apps = enhanceCollection(this.context.collection, {
      filter: { layout: "Partner" },
      sort: "index",
    })

    return (
      <Page { ...this.props}>
        <h2>{ "Partners" }</h2>
        <PagesList pages={ apps } />
      </Page>
    )
  }
}
