/* @flow */
import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Page from "../Page"
// import PagesList from "../../components/PagesList"

export default class GuideIndex extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string/* .isRequired */,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string/* .isRequired */,
    className: PropTypes.string,
  }

  static contextTypes = {
    collection: PropTypes.array/* .isRequired */,
  }

  render() {
    const {
      collection,
    } = this.context

    return (
      <Page { ...this.props}>
        <h1>{ "Guides for: " } { this.props.head.app }</h1>
        { this.props.head && this.props.head.topics &&
        this.props.head.topics.map((topic) => {
          return (
            <div key={ topic.name }>
              <h2>{ topic.title }</h2>
              { enhanceCollection(collection, {
                filter: { layout: "Guide", topic: topic.name },
                sort: "index",
              })
                .map((item) => {
                  return (
                    <Link to={ item.__url } key={ item.__url }>{ item.title }</Link>
                  )
                })
              }
            </div>
          )
        }) }
      </Page>
    )
  }
}
