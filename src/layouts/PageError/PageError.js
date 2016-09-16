import React, { Component, PropTypes } from "react"
import styles from "./index.css"

export default class PageError extends Component {

  static propTypes = {
    error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    errorText: PropTypes.string,
  };

  static defaultProps = {
    error: 404,
    errorText: "Page Not Found",
  };

  render() {
    const {
      error,
      errorText,
    } = this.props

    return (
      <div className={ styles.container }>
        <div className={ styles.oops }>{ "😱 Oooops!" }</div>
        <div className={ styles.text }>
          <p className={ styles.title }>
            <strong>{ error }</strong>
            { " " }
            { errorText }
          </p>
          {
            error === 404 &&
            <div>
              { "It seems this page is missing. " }
              { "Check the URL for spelling mistakes or use the navigation bar to return to our main pages. " }
              <br />
              { "Do not hesitate to contact us if you were expecting to see something else on this page. " }
              <br />
              { "Copy the URL and paste it into our Contact Us form - you will find the link in the nagivation bar above  😁." }
            </div>
          }
        </div>
      </div>
    )
  }
}
