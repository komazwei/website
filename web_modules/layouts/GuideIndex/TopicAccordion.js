/* @flow */
import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import enhanceCollection from "phenomic/lib/enhance-collection"
import cx from "classnames"

import styles from "./TopicAccordion.scss"

export default class TopicAccordion extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string/* .isRequired */,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string/* .isRequired */,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
  }

  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  constructor() {
    super()
    this.state = {
      active: false,
    }
  }

  handleToggle = () =>  {
    this.setState({
      active: !this.state.active,
    })
  }

  render() {
    const guides = enhanceCollection(this.context.collection, {
      filter: { layout: "Guide", topic: this.props.topic },
      sort: "index",
    })

    const stateStyle = this.state.active ? styles.active : styles.inactive

    return (
      <section className={ cx(styles.parent, stateStyle) }>
        <h2 onClick={ this.handleToggle } className={ styles.parentTitle }>{ this.props.title }</h2>
        <div className={ cx(styles.overflow) }>
          <div className={ cx(styles.children) }>
            { guides.map((guide) => (
              <div key={ guide.__url } className={ cx(styles.child) }>
                <Link to={ guide.__url } className={ styles.guideLink }>
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
