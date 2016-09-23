/* @flow */
import React, { PropTypes } from "react"
import { Grid, Cell } from "react-mdl"
import classNames from "classnames"

import styles from "./Lead.scss"

const Lead = ({ title, description }) => {

  return (
    <section className={ classNames(styles.section) }>
      <div className={ classNames(styles.aux) }>
        <Grid>
          <Cell
            col={ 12 }
            className={ classNames(styles.container) }
          >
            <h2
              className={ classNames(styles.title) }
            >
              { title }
            </h2>
            <p
              className={ classNames(styles.description) }
            >
              { description }
            </p>
          </Cell>
        </Grid>
      </div>
    </section>
  )
}

Lead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Lead
