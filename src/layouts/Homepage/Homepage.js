/* @flow */
import React, { PropTypes } from "react"
// import Page from "../Page"
// import cx from "classnames"
import Page from "../Page"
import Hero from "../../components/Hero"
import Lead from "../../components/Lead"
import Features from "../../components/Features"
import Featurettes from "../../components/Featurettes"
import FeatureGrid from "../../components/FeatureGrid"
// import Feature from "../../components/Feature"

const Homepage = (props) => {

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
      <Features
        features={ props.head.features }
      />
      <Featurettes
        featurettes={ props.head.featurettes }
      />
      <FeatureGrid { ...props } />
    </Page>
  )
}

Homepage.propTypes = {
  head: PropTypes.object.isRequired
}

export default Homepage
