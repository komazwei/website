import React, { Component } from "react"
import { Route } from "react-router"
import PhenomicPageContainer from "phenomic/lib/PageContainer"

import LayoutContainer from "../layouts/LayoutContainer"

import "../styles/global.styles"

import Page from "../layouts/Page"
import PageError from "../layouts/PageError"
import PageLoading from "../layouts/PageLoading"
import Homepage from "../layouts/Homepage"
import Services from "../layouts/Services"
import Service from "../layouts/Service"
import Partners from "../layouts/Partners"
import Partner from "../layouts/Partner"
import Blog from "../layouts/Blog"
import Post from "../layouts/Post"
import Docs from "../layouts/Docs"
import GuideIndex from "../layouts/GuideIndex"
import Guide from "../layouts/Guide"

class PageContainer extends Component {
  render() {
    const { props } = this
    return (
      <PhenomicPageContainer
        { ...props }
        layouts={ {
          Page,
          PageError,
          PageLoading,
          Homepage,
          Services,
          Service,
          Partners,
          Partner,
          Blog,
          Post,
          Docs,
          GuideIndex,
          Guide,
        } }
      />
    )
  }
}

export default (
  <Route component={ LayoutContainer }>
    <Route path="*" component={ PageContainer } />
  </Route>
)
