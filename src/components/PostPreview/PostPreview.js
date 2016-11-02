/* @flow */
import React, { PropTypes } from "react"
import { Link } from "react-router"
import classNames from "classnames"
import styles from "./PostPreview.less"

import { Card } from "react-mdl"

const PostPreview = ({ __url, date, title, description, image }) => {
  const pageDate = date ? new Date(date) : null

  const imgStyle = image
    ? { backgroundImage: "url('" + image + "')" }
    : null

  return (
    <Card className={ classNames(styles.card) }>
      <div style={ imgStyle } className={ styles.media }>
        <h2>
          <Link to={ __url } className={ classNames(styles.link) }>
            { title }
          </Link>
        </h2>
      </div>
      {
        description &&
          <div className={ classNames(styles.supportingText) }>
            { description }
          </div>
      }
      {
        pageDate &&
          <div className={ classNames(styles.supportingText, styles.meta) }>
            <div className={ classNames(styles.minilogo) }></div>
            <div>
              <strong>{ "Helmut Drewes" }</strong>
              <span>
                <time key={ pageDate.toISOString() }>
                  { pageDate.toDateString() }
                </time>
              </span>
            </div>
          </div>
      }
    </Card>
  )
}

PostPreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
}

export default PostPreview
