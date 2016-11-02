/* @flow */
import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import enhanceCollection from "phenomic/lib/enhance-collection"
import classNames from "classnames"

import styles from "./TopicAccordion.less"

class TopicAccordion extends Component {

  constructor() {
    super()
    this.state = {
      active: false
    }
  }

  handleToggle = () =>  {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const guides = enhanceCollection(this.context.collection, {
      filter: { layout: "Guide", topic: this.props.topic },
      sort: "index"
    })

    const stateStyle = this.state.active ? styles.active : styles.inactive

    return (
      <section
        className={ classNames(styles.topic, stateStyle) }
      >
        <h3
          onClick={ this.handleToggle }
          className={ styles.parentTitle }
        >
          { this.props.title }
        </h3>
        <div
          className={ classNames(styles.overflow) }
        >
          <div
            className={ classNames(styles.children) }
          >
            { guides.map((guide) => (
              <div
                key={ guide.__url }
                className={ classNames(styles.child) }
              >
                <Link
                  to={ guide.__url }
                  className={ classNames(styles.guideLink) }
                >
                  { guide.title }
                </Link>
              </div>
            )) }
          </div>
        </div>
      </section>
    )
  }
}

TopicAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired
}

TopicAccordion.contextTypes = {
  collection: PropTypes.array.isRequired
}

export default TopicAccordion
