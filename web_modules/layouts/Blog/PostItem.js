import React, { PropTypes } from "react"
import { Link } from "react-router"
import classnames from "classnames"

import Date from "../../components/Date"
// import Tag from "../../components/Tag"
import styles from "./PostItem.scss"

const PostItem = ({ __url, date, title, draft, description }) => {
  const articleClass = classnames(styles.article, {
    [styles.draft]: draft,
  })

  const linkClass = classnames(styles.title, {
    [styles.titleDraft]: draft,
  })

  return (
    <article
      key={ __url }
      className={ articleClass }
    >
      <Link
        to={ __url }
        className={ linkClass }
      >
        { title }
      </Link>
      <p>
        <Date date={ date } className={ styles.date } />
      </p>
      {
        description &&
          <p className={ styles.description }>{ description }</p>
      }
    </article>
  )
}

PostItem.propTypes = {
  __url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  draft: PropTypes.boolean,
}

export default PostItem
