import React, { Component, PropTypes } from "react"
// import enhanceCollection from "phenomic/lib/enhance-collection"

// import styles from "./Lead.scss"
// import cx from "classnames"

export default class Lead extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
  }

  render() {
    return (
      <section>
        <h2>{ this.props.head.lead }</h2>
        <p>{ this.props.head.leadDescription }</p>
      </section>
    )
  }
}
