/* @flow */
import React, { PropTypes } from "react"
import cx from "classnames"

import { Grid, Cell } from "react-mdl"

import styles from "./Featurette.scss"

const Featurette = ({ title, image, description }) => {
  return (
    <Grid className={ cx(styles.section) }>
      <Cell col={ 6 }>
        <div className={ cx(styles.imageContainer) }>
          <img src={ image } className={ cx(styles.image) } />
        </div>
      </Cell>
      <Cell col={ 6 }>
        <header className={ cx(styles.header) }>
          <h2 className={ cx(styles.title) }>{ title }</h2>
          <p>{ description }</p>
        </header>
      </Cell>
    </Grid>
  )
}

Featurette.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rtl: PropTypes.bool,
}

export default Featurette
