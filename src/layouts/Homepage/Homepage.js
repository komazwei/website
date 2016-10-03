/* @flow */
import React, { PropTypes } from "react"
// import Page from "../Page"
// import cx from "classnames"
import Page from "../Page"
import Hero from "../../components/Hero"
import Lead from "../../components/Lead"
import Feature from "../../components/Feature"
import FeaturettesList from "../../components/FeaturettesList"
import FeatureHighlight from "../../components/FeatureHighlight"
// import Feature from "../../components/Feature"

const Homepage = (props) => {

  const features = props.head.features

  return (
    <Page { ...props }>
      <Hero
        title={ props.head.title }
        cta={ props.head.heroCTA }
      />
      <Lead
        title={ props.head.lead }
        description={ props.head.leadDescription }
      />
      <Feature
        features={ features }
      />
      <FeaturettesList
        featurettes={ props.head.featurettes }
      />
      <FeatureHighlight { ...props } />
    </Page>
  )
}

Homepage.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Homepage
