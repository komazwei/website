/* @flow */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import cx from "classnames"
import GoogleAnalyticsTracker from "../../components/GoogleAnalyticsTracker"
import { Layout, Content } from "react-mdl"
import Navbar from "../../components/Navbar"
// import SiteFooter from "../../components/SiteFooter"

// import "./index.global.css"
// import styles from "./index.css"
import "../../styles/global.styles"
import "../../styles/react-mdl/material.min.js"

export default class LayoutContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <GoogleAnalyticsTracker params={ this.props.params }>
        <Helmet
          link={ [
            { "rel": "icon", "href": "/images/favicon.png" },
          ] }
          meta={ [
            {
              name: "generator", content: `${
              process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
            },
            { property: "og:site_name", content: pkg.name },
            { name: "twitter:site", content: `@${ pkg.twitter }` },
          ] }
          script={ [
            { src: "https://cdn.polyfill.io/v2/polyfill.min.js" },
          ] }
        />

        { /* meta viewport safari/chrome/edge */ }
        <Helmet
          meta={ [ {
            name: "viewport", content: "width=device-width, initial-scale=1",
          } ] }
        />
        <style>{ "@-ms-viewport { width: device-width; }" }</style>
        <Layout fixedHeader>
          <Navbar />
          <Content className={ cx("mdl-color-text--grey-600","mdl-color--grey-50") } >
            { this.props.children }
          </Content>
        </Layout>
      </GoogleAnalyticsTracker>
    )
  }
}
