/* @flow */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import { joinUri } from "phenomic"
// import Page from "../Page"
// import cx from "classnames"
import SiteFooter from "../../components/SiteFooter"
import Hero from "../../components/Hero"
import Lead from "../../components/Lead"
import Feature from "../../components/Feature"
import Featurette from "../../components/Featurette"
import FeatureHighlight from "../../components/FeatureHighlight"
// import Feature from "../../components/Feature"

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string.isRequired,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
  }
  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {

    const { props, context } = this

    const {
      // __filename,
      __url,
      head,
      //body,
      //header,
      //footer,
    } = props

    const {
      pkg,
    } = context.metadata

    const metaTitle = head.metaTitle ? head.metaTitle : head.title

    const meta = [
      { property: "og:type", content: "website" },
      { property: "og:title", content: metaTitle },
      {
        property: "og:url",
        content: joinUri(process.env.PHENOMIC_USER_URL, __url),
      },
      { property: "og:description", content: head.description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: metaTitle },
      { name: "twitter:creator", content: `@${ pkg.twitter }` },
      { name: "twitter:description", content: head.description },
      { name: "description", content: head.description },
    ]

    const features = this.props.head.features

    const featurettes = this.props.head.featurettes

    return (
      <div>
        <Helmet
          title={ metaTitle }
          meta={ meta }
        />
        <Hero { ...this.props } />
        <Lead
          title={ head.lead }
          description={ head.leadDescription }
        />
        <Feature features={ features } />
        { featurettes.map((featurette) => (
          <Featurette
            key={ featurette.name }
            image={ featurette.image }
            title={ featurette.title }
            description={ featurette.description }
            reverse={ featurette.reverse }
            grey={ featurette.grey }
          />
        )) }
        <FeatureHighlight { ...this.props } />
        <SiteFooter />
      </div>
    )
  }
}
