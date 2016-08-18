import React, { Component, PropTypes } from "react"
import Page from "../Page"
// import cx from "classnames"
import Hero from "../../components/Hero"
import Lead from "../../components/Lead"
import Feature from "../../components/Feature"
import Featurette from "../../components/Featurette"
import FeatureHighlight from "../../components/FeatureHighlight"
// import Feature from "../../components/Feature"

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    return (
      <Page { ...this.props } >
        <Hero { ...this.props } />
        <Lead { ...this.props } />
        <Feature { ...this.props } />
        <Featurette { ...this.props } />
        <FeatureHighlight { ...this.props } />
      </Page>
    )
  }
}
