/* @flow */
import React, { PropTypes } from "react"
import cx from "classnames"
import { Grid, Cell } from "react-mdl"
import PostPreview from "../../components/PostPreview"

import styles from "./PostsList.scss"

const PostsList = ({ posts }) => {
  return (
    <div>
      <Grid className={ cx(styles.posts) }>
        { posts.map((post) => (
          <Cell
            key={ post.__url }
            col={ 12 }
            shadow={ 0 }
          >
            <PostPreview
              __url={ post.__url }
              date={ post.date }
              title={ post.title }
              description={ post.description }
              image={ post.image }
            />
          </Cell>
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
