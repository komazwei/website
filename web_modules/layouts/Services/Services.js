// @flow
import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Page from "../Page"
import PagesList from "../../components/PagesList"

export default class Services extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const apps = enhanceCollection(this.context.collection, {
      filter: { layout: "Service" },
      sort: "index",
    })

    return (
      <Page { ...this.props}>
        <h2>{ "Services" }</h2>
        <PagesList pages={ apps } />
      </Page>
    )
  }
}
