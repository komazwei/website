/* @flow */
import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import cx from "classnames"
import { BodyContainer } from "phenomic"
import { Grid, Cell, Card } from "react-mdl"
import Ribbon from "../../components/Ribbon"

import styles from "./Post.less"

const Post = (props, context) => {
  const { metadata } = context

  const { head, body, __url } = props

  const post = head

  const imgStyle = post.image
    ? { backgroundImage: "url('" + post.image + "')" }
    : null

  const pageDate = head.date ? new Date(head.date) : null

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
          { name: "twitter:creator", content: `@${ head.twitter }` }
        ] }
      />
      <Ribbon
        title={ "" }
        link="/blog"
        back
      />
      <div className={ cx(styles.container) }>
        <div>
          <Grid className={ cx(styles.post) }>
            <Cell
              col={ 12 }
              shadow={ 0 }
            >
              <Card className={ cx(styles.card) }>
                <div style={ imgStyle } className={ cx(styles.media) }>
                  <h2>
                    { post.title }
                  </h2>
                </div>
                <div className={ cx(
                  "mdl-color-text--grey-700",
                  "mdl-card__supporting-text",
                  styles.supportingText,
                  styles.meta
                ) }
                >
                  <div className={ cx(styles.minilogo) }></div>
                  <div>
                    <strong>
                      { "Helmut Drewes" }
                    </strong>
                    <span>
                      <time key={ pageDate.toISOString() }>
                        { pageDate.toDateString() }
                      </time>
                    </span>
                  </div>
                </div>
                <div className={ styles.supportingText } >
                  <BodyContainer>
                    { body }
                  </BodyContainer>
                </div>
              </Card>
            </Cell>
          </Grid>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  __url: PropTypes.string.isRequired,
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired
}

Post.contextTypes = {
  metadata: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Post
