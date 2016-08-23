import React, { PropTypes } from "react"
import SVGInline from "react-svg-inline"

import Avatar from "../Avatar"

import getAuthorUri from "../../utils/getAuthorUri"

const Author = ({ afterName, author, bio, isPost }, context) => {
  const authorData = context.metadata.author.getContributor(author)

  return (
    <div>

      <Avatar
        author={ authorData.login }
      />

      <div>
        <div>
          <h3>
            {
              isPost &&
              <span>
                { author }
              </span>
            }
            <a
              className="putainde-Link"
              href={ getAuthorUri(authorData) }
            >
              { authorData.login }
            </a>
            {
              afterName &&
              <span className="putainde-Author-afterName">
                { ` ${afterName}` }
              </span>
            }
          </h3>

          <div className="putainde-Author-social">
            {
              authorData.twitter &&
              <a
                href={ getAuthorUri(authorData, "twitter") }
                className="r-Tooltip r-Tooltip--top"
                data-r-tooltip="Twitter"
              >
                <SVGInline
                  className="putainde-Icon"
                  svg={ require("../../icons/twitter.svg") }
                  cleanup
                />
              </a>
            }
          </div>
        </div>

        {
          bio &&
          <p className="putainde-Author-bio">
            {
              authorData.bio.long
              /* @todo add new lines between lines */
            }
          </p>
        }
      </div>
    </div>
  )
}

Author.contextTypes = {
  metadata: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

Author.propTypes = {
  author: PropTypes.string.isRequired,
  afterName: PropTypes.string,
  bio: PropTypes.bool,
  className: PropTypes.string,
  isPost: PropTypes.bool,
}

Author.defaultProps = {
  bio: true,
}

export default Author
