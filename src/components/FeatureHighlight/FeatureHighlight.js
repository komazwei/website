import React, { PropTypes } from "react"
// import { Link } from "react-router"
import cx from "classnames"
import invariant from "invariant"
import styles from "./FeatureHighight.scss"

const FeatureHighlight = (props) => {
  invariant(
    props.head && props.head.featureHighlights,
    "Home page needs a feature highlight list"
  )

  const sectionClasses = cx(
    styles.section
  )

  const cellClasses = cx(
    "mdl-cell",
    "mdl-cell--6-col",
    "mdl-cell--12-col-phone",
    "section__module"
  )

  return (
    <section>
      <div className={ sectionClasses }>
        <div className={ "mdl-grid" }>
          {
            props.head && props.head.featureHighlights &&
            props.head.featureHighlights.map((featureHighlight) => {
              return (
                <div
                  key={ featureHighlight.name }
                  className={ cellClasses }
                >
                  <i className={ "material-icons" }>
                    { featureHighlight.icon }
                  </i>
                  <h4>{ featureHighlight.title }</h4>
                  <p>{ featureHighlight.description }</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

FeatureHighlight.propTypes = {
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
}

export default FeatureHighlight
