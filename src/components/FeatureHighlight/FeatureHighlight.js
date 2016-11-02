import React, { PropTypes } from "react"
// import { Link } from "react-router"
import cx from "classnames"
import { Grid, Cell } from "react-mdl"
import invariant from "invariant"
import styles from "./FeatureHighlight.less"

const FeatureHighlight = (props) => {
  invariant(
    props.head && props.head.featureHighlights,
    "Home page needs a feature highlight list"
  )

  return (
    <section className={ cx(styles.section) }>
      <div className={ cx(styles.aux) }>
        <Grid>
          {
            props.head && props.head.featureHighlights &&
            props.head.featureHighlights.map((featureHighlight) => {
              return (
                <Cell
                  key={ featureHighlight.name }
                  className={ styles.item }
                >
                  <div className={ cx(styles.image) }>
                    <i className={ "material-icons" }>
                      { featureHighlight.icon }
                    </i>
                  </div>
                  <h4>{ featureHighlight.title }</h4>
                  <p>{ featureHighlight.description }</p>
                </Cell>
              )
            })
          }
        </Grid>
      </div>
    </section>
  )
}

FeatureHighlight.propTypes = {
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired
}

export default FeatureHighlight
