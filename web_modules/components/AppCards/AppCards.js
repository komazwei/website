import React, { PropTypes } from "react"
import { Link } from "react-router"

const AppCards = ({ apps }) => {
  return (
    <section>
      <ul>
        { apps.map((app) => (
          <li key={ app.title }>
            <Link to={ app.__url }>{ app.title }</Link>
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
