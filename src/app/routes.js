import React from "react"
import { Route } from "react-router"
import Layouts from "./layouts"

import LayoutContainer from "../layouts/LayoutContainer"

export default (
  <Route component={ LayoutContainer }>
    <Route path="*" component={ Layouts } />
  </Route>
)
