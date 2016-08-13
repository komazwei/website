import React, { Component, PropTypes } from "react"
import Page from "../Page"
// import cx from "classnames"
import Hero from "./Hero"
// import Features from "../../components/Features"

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    return (
      <Page { ...this.props } >
        <Hero { ...this.props } />
      </Page>
    )
  }
}
