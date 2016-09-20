/* @flow */
import React, { PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"
import styles from "./PostPreview.scss"

import { Card } from "react-mdl"

const PostPreview = ({ __url, date, title, description, image }) => {
  const pageDate = date ? new Date(date) : null

  const imgUrl = {
    backgroundImage: "url(" + image + ")",
  }

  console.log(imgUrl)
  return (
    <Card className={ cx(styles.card) }>
      <div className={ cx(styles.media, imgUrl) }>
        <h3>
          <Link to={ __url } className={ cx(styles.link) }>
            { title }
          </Link>
        </h3>
      </div>
      {
        description &&
          <div className={ cx(styles.supportingText) }>
            { description }
          </div>
      }
      {
        pageDate &&
          <div className={ cx(styles.supportingText, styles.meta) }>
            <div className={ cx(styles.minilogo) }></div>
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
  image: PropTypes.string,
}

export default PostPreview
