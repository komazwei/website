import React, { Component, PropTypes } from "react"

import Page from "../Page"

export default class Guide extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
  }

  render() {
    const { props } = this
    const { head } = props

    const pageDate = head.date ? new Date(head.date) : null

    return (
      <Page
        { ...props }
        header={
          <header>
            {
              pageDate &&
                <time key={ pageDate.toISOString() }>
                  { pageDate.toDateString() }
                </time>
            }
          </header>
        }
      />
    )
  }
}
