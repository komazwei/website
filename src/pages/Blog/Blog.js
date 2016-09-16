/* @flow */
import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Page from "../../layouts/Page"
import PostsList from "../../components/PostsList"
// import { Link } from "react-router"
import styles from "./Blog.scss"
import enhanceCollection from "phenomic/lib/enhance-collection"
// import Icon from "../../components/Icon"

const numberOfLatestPosts = 10

export default class Blog extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  };

  render() {
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
      limit: numberOfLatestPosts,
    })

    return (
      <Page { ...this.props }>
        <div className={ cx(styles.wrapper) }>
          <PostsList posts={ latestPosts } />
        </div>
      </Page>
    )
  }
}
