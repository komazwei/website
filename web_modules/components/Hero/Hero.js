import React, { Component, PropTypes } from "react"
import styles from "./Hero.scss"
import cx from "classnames"

export default class Hero extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string/* .isRequired */,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string/* .isRequired */,
    className: PropTypes.string,
  };

  render() {
    const heroContainerClasses = cx(
      styles.hero,
      styles.heroHome
    )

    const heroBgContainerClasses = cx(
      styles.heroBgContainer
    )

    const heroContainerOverlay = cx(
      styles.heroBgContainerOverlay,
      "mdl-typography--text-center"
    )

    const ctaBtnClasses = cx(
      styles.heroCTABtn,
      "mdl-button",
      "mdl-js-button",
      "mdl-button--raised",
      "mdl-button--accent",
      "mdl-js-ripple-effect"
    )

    const heroFabButtonClasses = cx(
      styles.heroFab,
      "mdl-button",
      "mdl-js-button",
      "mdl-button--fab",
      "mdl-js-ripple-effect"
    )

    return (
      <div className={ heroContainerClasses }>
        <div className={ heroBgContainerClasses }>
          <div className={ heroContainerOverlay }>
            <h1>{ this.props.head.title }</h1>
            <p>{ this.props.head.title }</p>
            <a className={ ctaBtnClasses } id={ "sign-up--hero__button" }>
              { this.props.head.heroCTA }
            </a>
          </div>
          <a name={ "#screens" }></a>
        </div>
        <button className={ heroFabButtonClasses }>
          <i className={ "material-icons" }>
            { "expand_more" }
          </i>
        </button>
      </div>
    )
  }
}
