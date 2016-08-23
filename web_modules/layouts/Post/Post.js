import React, { PropTypes } from "react"
import Helmet from "react-helmet"

import Author from "../../components/Author"

const Post = (props, context) => {
  const { metadata } = context

  const { head, body, __url } = props

  const post = head

  return (
    <div>
      <Helmet
        title={ head.title }
        meta={ [
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
          { property: "og:title", content: head.title },
          { name: "twitter:title", content: head.title },
          { property: "og:description", content: head.description },
          { name: "twitter:description", content: head.description },
          { property: "og:url", content: metadata.pkg.homepage + __url },
          // { property: "og:image", content: header.image },
          // { name: "twitter:image", content: header.image },
          { name: "twitter:creator", content: `@${ head.twitter }` },
        ] }
      />
      <div>
        <div>
          <div>
            <div
              dangerouslySetInnerHTML={ { __html: body } }
            />
          </div>
          <footer>
            {
              post.author && post.author.length === 1 &&
              <div>
                <Author author={ post.author } isPost />
              </div>
            }
            {
              post.authors && post.author.length > 1 &&
              <div>
                <h3>by:</h3>
                <Author author={ post.author } />
              </div>
            }
          </footer>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  __url: PropTypes.string.isRequired,
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  rawBody: PropTypes.string.isRequired,
}

Post.contextTypes = {
  metadata: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Post
