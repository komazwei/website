/* @flow */
import React, { PropTypes, Component } from "react"
import classNames from "classnames/bind"
import { Grid, Cell } from "react-mdl"
import styles from "./Featurette.scss"

const cx = classNames.bind(styles)

export default class Featurette extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reverse: PropTypes.bool,
    grey: PropTypes.bool,
  }

  render() {
    const { image, title, description, reverse, grey } = this.props

    const classes = cx(styles.section, {
      reverse: reverse,
      grey: grey,
    })

    return (
      <section className={ classes }>
        <div className={ cx(styles.aux) }>
          <Grid className={ cx(styles.grid) }>
            <Cell col={ 6 } phone={ 12 } className={ cx(styles.cell, styles.image) }>
              <div className={ cx(styles.imageContainer) }>
                <img src={ image } />
              </div>
            </Cell>
            <Cell col={ 6 } phone={ 12 } className={ cx(styles.content) }>
              <header className={ cx(styles.header) }>
                <h2 className={ cx(styles.title) }>{ title }</h2>
                <p>{ description }</p>
              </header>
            </Cell>
          </Grid>
        </div>
      </section>
    )

  }
}
