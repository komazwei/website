/* @flow */
import React from "react"
import Helmet from "react-helmet"
import TopBarProgressIndicator from "react-topbar-progress-indicator"
import { Spinner } from "react-mdl"

import styles from "./PageLoading.scss"

TopBarProgressIndicator.config({
  barColors: {
    "0": "#689F38",
    "1.0": "#689F38",
  },
  shadowBlur: 0,
})

const PageLoading = () => {
  return (
    <div>
      <Helmet
        title={ "Loading..." }
      />
      <TopBarProgressIndicator />
      <div className={ styles.spinnerContainer }>
        <Spinner singleColor />
      </div>
    </div>
  )
}

export default PageLoading
