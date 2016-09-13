import React, { PropTypes } from "react"
import { Link } from "react-router"
import cx from "classnames"

import styles from "./AppCards.scss"

const AppCards = ({ apps }) => {
  return (
    <section className={ cx(styles.appSelector) }>
      <ul className={ cx(styles.list) }>
        { apps.map((app) => (
          <li key={ app.title } className={ cx(styles.item) }>
            <Link to={ app.__url }>
              <img src={ app.image }></img>
              <h3>{ app.title }</h3>
            </Link>
          </li>
          ))
        }
      </ul>
    </section>
  )
}

AppCards.propTypes = {
  apps: PropTypes.array.isRequired,
}

export default AppCards
