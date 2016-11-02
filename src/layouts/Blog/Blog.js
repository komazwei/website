/* @flow */
import React, { PropTypes } from "react"
import cx from "classnames"
import Page from "../../layouts/Page"
import Ribbon from "../../components/Ribbon"
import PostsList from "../../components/PostsList"
// import { Link } from "react-router"
import styles from "./Blog.less"
import enhanceCollection from "phenomic/lib/enhance-collection"
// import Icon from "../../components/Icon"

const Blog = (props, { collection }) => {
  const numberOfLatestPosts = 10

  const latestPosts = enhanceCollection(collection, {
    filter: { layout: "Post" },
    sort: "date",
    limit: numberOfLatestPosts
  })

  return (
    <Page { ...props }>
      <Ribbon
        title={ "Blog" }
      />
      <div className={ cx(styles.blog) }>
        <PostsList posts={ latestPosts } />
      </div>
    </Page>
  )
}

Blog.contextTypes = {
  collection: PropTypes.array.isRequired
}

export default Blog
