import React, { PropTypes } from "react"
// import { Link } from "react-router"
import cx from "classnames"
import styles from "./Feature.scss"
import invariant from "invariant"

const Feature = (props) => {
  invariant(
    props.head && props.head.features,
    "Home page needs a feature list"
  )

  const sectionClasses = cx(
    styles.section
  )
  const cellClasses = cx(
    "mdl-cell",
    "mdl-cell--4-col",
    "mdl-cell--12-col-phone",
    "section__module"
  )
  return (
    <section>
      <div className={ sectionClasses }>
        <div className={ "mdl-grid" }>
          {
            props.head && props.head.features &&
            props.head.features.map((feature) => {
              return (
                <div
                  key={ feature.name }
                  className={ cellClasses }
                >
                  <img src={ feature.image } />
                  <h2>{ feature.title }</h2>
                  <p>{ feature.description }</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

Feature.propTypes = {
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
}

export default Feature
