import React from "react"
import { Link } from "react-router"
import classNames from "classnames"
import styles from "./Footer.scss"

const Footer = () => {

  return (
    <footer>
      <div className={ classNames(styles.links) }>
        <ul>
          <li>
            { "©2016 Agrista" }
          </li>
          <li>
            <Link to={ "/docs" }>{ "Help" }</Link>
          </li>
          <li>
            <a href="/privacy">Privacy</a>
          </li>
          <li>
            <a href="/terms">Terms</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
