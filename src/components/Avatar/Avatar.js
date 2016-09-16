import React, { PropTypes } from "react"

import getAuthorUri from "../../utils/getAuthorUri"
import defaultAvatar from "./default.png"

const Avatar = ({ author, className }, context) => {
  const { metadata } = context
  const authorData = metadata.author.getContributor(author)
  const size = size || 128

  return (
    <a
      href={ getAuthorUri(authorData) }
      className={ `putainde-Avatar ${className}` }
    >
      <img
        className="js-AnimateLoad"
        src={
          authorData && authorData.avatar_url
          ? authorData.avatar_url + "&s=" + size
          : defaultAvatar
        }
        alt=""
      />
    </a>
  )
}

Avatar.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

Avatar.propTypes = {
  className: PropTypes.string,
  author: PropTypes.string.isRequired,
}

export default Avatar
