import React, { PropTypes } from "react"
//import classNames from "classnames"
// import "./index.global.css"
// import "./highlight.global.css"
import "./styles/global.styles"
import "react-mdl/extra/material.js"

// import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import SiteHeader from "./components/SiteHeader"
//import { Layout, Content } from "react-mdl"
import SiteFooter from "./components/SiteFooter"

const AppContainer = (props) => {
  return (
    <div>
      <DefaultHeadMeta />
      <SiteHeader />
      { props.children }
      <SiteFooter />
    </div>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node,
}

export default AppContainer
