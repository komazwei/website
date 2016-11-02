/* @flow */
import React, { PropTypes } from "react"
// import { Link } from "react-router"
// import enhanceCollection from "phenomic/lib/enhance-collection"
import Page from "../Page"
import TopicAccordion from "./TopicAccordion"
import Ribbon from "../../components/Ribbon"
// import PagesList from "../../components/PagesList"
import cx from "classnames"

import styles from "./GuideIndex.less"

const GuideIndex = (props) => {
  const head = props.head

  return (
    <Page { ...props }>
      <Ribbon
        title={ "Agrista Help" }
        link={ "docs" }
        back
      />
      <div className={ cx(styles.content) }>
        <section className={ cx(styles.primaryContainer) }>
          <div className={ cx(styles.pageWidthContainer) }>
            <div className={ cx(styles.page) }>
              <nav>
                <h3>
                  { "Welcome to the Agrista " }
                  { head.title }
                  { " Help Center" }
                </h3>
                { head && head.topics &&
                  head.topics.map((topic) => (
                    <TopicAccordion
                      key={ topic.name }
                      title={ topic.title }
                      topic={ topic.name }
                    />
                  ))
                }
              </nav>
            </div>
          </div>
        </section>
      </div>
    </Page>
  )
}

GuideIndex.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  __filename: PropTypes.string/* .isRequired */,
  __url: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string/* .isRequired */,
  className: PropTypes.string
}

GuideIndex.contextTypes = {
  collection: PropTypes.array.isRequired
}

export default GuideIndex
