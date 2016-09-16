/* @flow */
import React, { PropTypes } from "react"
import styles from "./Featurette.scss"
import cx from "classnames"
import invariant from "invariant"

const Featurette = (props) => {
  invariant(
    props.head && props.head.features,
    "Home page needs a featurette list"
  )

  const sectionClasses = cx(
    styles.aux,
    styles.sectionModules
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
            props.head && props.head.featurettes &&
            props.head.featurettes.map((featurette) => {
              return (
                <div
                  key={ featurette.name }
                  className={ cellClasses }
                >
                  <img src={ featurette.image } />
                  <h4>{ featurette.title }</h4>
                  <p>{ featurette.description }</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

Featurette.propTypes = {
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
}

export default Featurette
