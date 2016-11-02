import React from "react"
import { Route } from "react-router"

import AppContainer from "./AppContainer"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import PageLoading from "./layouts/PageLoading"
import Post from "./layouts/Post"
import GuideIndex from "./layouts/GuideIndex"
import Guide from "./layouts/Guide"
import RibbonPage from "./layouts/RibbonPage"
import Homepage from "./layouts/Homepage"
import Docs from "./layouts/Docs"
import Blog from "./layouts/Blog"
import Contact from "./layouts/Contact"

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={ {
      Page,
      PageError,
      PageLoading,
      Homepage,
      Blog,
      Post,
      Docs,
      GuideIndex,
      Guide,
      RibbonPage,
      Contact
    } }
  />
)

export default (
  <Route component={ AppContainer }>
    <Route path="*" component={ PageContainer } />
  </Route>
)
