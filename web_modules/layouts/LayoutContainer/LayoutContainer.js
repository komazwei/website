import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"

import { Layout, Content } from "react-mdl"
import NavHeader from "../../components/Header"
import SiteFooter from "../../components/Footer"

// import "./index.global.css"
// import styles from "./index.css"

export default class LayoutContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <div>
        <Helmet
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
        <Layout>
          <NavHeader />
          <Content>
            { this.props.children }
            <SiteFooter />
          </Content>
        </Layout>
      </div>
    )
  }
}
