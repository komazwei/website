/* @flow */
import React, { PropTypes } from "react"
import { Grid, Cell } from "react-mdl"
import cx from "classnames"
import styles from "./Feature.scss"

const Feature = ({ features }) => {
  return (
    <section id="feature" className={ cx(styles.section) }>
      <div className={ cx(styles.aux) }>
        <Grid>
          { features.map((feature) => (
            <Cell
              key={ feature.name }
              col={ 4 }
              phone={ 12 }
              className={ cx(styles.item) }
            >
              <img src={ feature.image } />
              <h4>{ feature.title }</h4>
              <p>{ feature.description }</p>
            </Cell>
          )) }
        </Grid>
      </div>
    </section>
  )
}

Feature.propTypes = {
  features: PropTypes.array.isRequired,
}

export default Feature
