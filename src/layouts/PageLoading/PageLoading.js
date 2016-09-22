import React, { Component } from "react"
import Helmet from "react-helmet"
import TopBarProgressIndicator from "react-topbar-progress-indicator"
import { Spinner } from "react-mdl"

TopBarProgressIndicator.config({
  barColors: {
    "0": "#689F38",
    "1.0": "#689F38",
  },
  shadowBlur: 0,
})

export default class PageLoading extends Component {

  render() {
    return (
      <div>
        <Helmet
          title={ "Loading..." }
        />
        <TopBarProgressIndicator />
        <Spinner singleColor />
      </div>
    )
  }
}
