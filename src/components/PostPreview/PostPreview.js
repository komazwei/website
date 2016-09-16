/* @flow */
import React, { PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"
import styles from "./PostPreview.scss"

import { Card, Cell } from "react-mdl"

const PostPreview = ({ __url, date, title, description }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <Cell col={ 12 } shadow={ 0 }>
      <Card className={ cx(styles.media) }>
        <h3>
          <Link to={ __url } className={ cx(styles.link) }>
            { title }
          </Link>
        </h3>
      </Card>
      {
        description &&
          <Card className={ cx(styles.supportingText) }>
            { description }
          </Card>
      }
      {
        pageDate &&
          <Card className={ cx(styles.supportingText, styles.meta) }>
            <div className={ cx(styles.minilogo) }></div>
            <div>
              <strong>{ "Helmut Drewes" }</strong>
              <span>
                <time key={ pageDate.toISOString() }>
                  { pageDate.toDateString() }
                </time>
              </span>
            </div>
          </Card>
      }
    </Cell>
  )
}

PostPreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  description: PropTypes.string,
}

export default PostPreview
