/* @flow */
import React, { PropTypes } from "react"
import cx from "classnames"
import { Grid } from "react-mdl"
import PostPreview from "../../components/PostPreview"

import styles from "./PostsList.scss"

const PostsList = ({ posts }) => {
  return (
    <div>
      <Grid className={ cx(styles.posts) }>
        { posts.map((post) => (
          <PostPreview
            key={ post.__url }
            __url={ post.__url }
            date={ post.date }
            title={ post.title }
            description={ post.description }
          />
          ))
        }
      </Grid>
    </div>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostsList
