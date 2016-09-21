import React, { Component } from "react"
import PhenomicPageContainer from "phenomic/lib/PageContainer"
/* custom layouts */
import Page from "../layouts/Page"
import PageError from "../layouts/PageError"
import PageLoading from "../layouts/PageLoading"
import Homepage from "../pages/Homepage"
import Services from "../pages/Services"
import Service from "../layouts/Service"
import Partners from "../pages/Partners"
import Partner from "../layouts/Partner"
import Blog from "../pages/Blog"
import Post from "../layouts/Post"
import Docs from "../pages/Docs"
import GuideIndex from "../layouts/GuideIndex"
import Guide from "../layouts/Guide"
/* custom pages */

export default class Layouts extends Component {
  render() {
    return (
      <PhenomicPageContainer
        { ...this.props }
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
