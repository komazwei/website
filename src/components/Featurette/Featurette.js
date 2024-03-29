/* @flow */
import React, { PropTypes } from "react"
import classNames from "classnames/bind"
import { Grid, Cell } from "react-mdl"
import styles from "./Featurette.scss"

const cx = classNames.bind(styles)

const Featurette = ({
  image,
  title,
  description,
  isReverse,
  isInverse,
  isImgBottom,
  isImgFull,
}) => {

  const sectionClasses = cx(styles.section, {
    reverse: isReverse,
    inverse: isInverse,
  })

  const imgClasses = cx({
    imgBottom: isImgBottom,
    imgFull: isImgFull,
  })

  return (
    <section className={ sectionClasses }>
      <div className={ cx(styles.aux) }>
        <Grid className={ cx(styles.grid) }>
          <Cell
            col={ 6 }
            phone={ 12 }
            className={ cx(styles.cell, styles.image) }
          >
            <div className={ cx(styles.imageContainer) }>
              <img src={ image } className={ imgClasses } />
            </div>
          </Cell>
          <Cell
            col={ 6 }
            phone={ 12 }
            className={ cx(styles.content) }
          >
            <header className={ cx(styles.header) }>
              <h2
                className={ cx(styles.title) }
              >
                { title }
              </h2>
              <p>{ description }</p>
            </header>
          </Cell>
        </Grid>
      </div>
    </section>
  )
}

Featurette.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isReverse: PropTypes.bool,
  isInverse: PropTypes.bool,
  isImgBottom: PropTypes.bool,
  isImgFull: PropTypes.bool,
}

export default Featurette
