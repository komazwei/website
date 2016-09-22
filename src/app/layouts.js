import React, { Component } from "react"
import PhenomicPageContainer from "phenomic/lib/PageContainer"
/* custom layouts */
import Page from "../layouts/Page"
import PageError from "../layouts/PageError"
import PageLoading from "../layouts/PageLoading"
import Service from "../layouts/Service"
import Partner from "../layouts/Partner"
import Post from "../layouts/Post"
import GuideIndex from "../layouts/GuideIndex"
import Guide from "../layouts/Guide"
import RibbonPage from "../layouts/RibbonPage"
/* custom pages */
import Homepage from "../pages/Homepage"
import Docs from "../pages/Docs"
import Blog from "../pages/Blog"
import Services from "../pages/Services"
import Partners from "../pages/Partners"
import Contact from "../pages/Contact"

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
          RibbonPage,
          Contact,
        } }
      />
    )
  }
}
