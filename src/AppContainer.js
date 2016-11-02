import React, { PropTypes } from "react"
import classNames from "classnames"
// import "./index.global.css"
// import "./highlight.global.css"
import "./styles/global.styles"
import "react-mdl/extra/material.js"

// import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import SiteHeader from "./components/SiteHeader"
import { Layout, Content } from "react-mdl"
import SiteFooter from "./components/SiteFooter"

const AppContainer = (props) => {
  const layoutClasses = classNames(
    "mdl-color-text--grey-600",
    "mdl-color--grey-50"
  )

  return (
    <Layout fixedHeader className={ layoutClasses }>
      <DefaultHeadMeta />
      <SiteHeader />
      <Content>
        { props.children }
        <SiteFooter />
      </Content>
    </Layout>
  )

}

AppContainer.propTypes = {
  children: PropTypes.node
}

export default AppContainer
