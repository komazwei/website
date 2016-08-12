import React, { Component } from "react"
import styles from "./Hero.scss"

export default class Hero extends Component {
  render() {
    return (
      <div className="hero hero--home">
        <div className="hero__bg-container">
          <div className="hero__bg-container-overlay mdl-typography--text-center">
            <h1>Show creditors how you farm different.</h1>
            <p>Let is help you prepare your farm records and financial plans without the pain of using spreadsheets.</p>
            <div className="hero__sign-up">
              <button className="sign-up hero__btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" data-g-action="click" data-g-event="Sign Up" data-g-label="hero" data-upgraded=",MaterialButton,MaterialRipple" id="sign-up--hero__button">
                Get Started
                <span className="mdl-button__ripple-container">
            <span className="mdl-ripple"></span>
          </span>
              </button>
            </div>
          </div>
          <a name="#screens"></a>
        </div>
        <button className="hero__fab mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
          <i className="material-icons">expand_more</i>
        </button>
      </div>
    )
  }
}
