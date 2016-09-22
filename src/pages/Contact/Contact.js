import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import classNames from "classnames"
import axios from "axios"
import styles from "./Contact.css"
import Page from "../../layouts/Page"

export default class Contact extends Component {

  static propType = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string.isRequired,
//    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      misc: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    console.log(e.target.value)
    console.log(e.target.innerText)
    console.log(e.target.dataset)
    const value = (e.target.value !== "") ? e.target.value : e.target.innerText
    this.setState({
      [`${e.target.dataset.input}`]: value,
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { name, email, text, company, phone } = this.state
    const re = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/
    if (email === "" || !re.test(email)) {
      alert("please enter a valid email address")
      return false
    }
    if (email && text) {
      const data = {
        "fields": {
          "Name": name,
          "Message": text,
          "Email": email,
          "Company": company,
          "Phone": phone,
        },
      }
      axios({
        method: "post",
        url: "https://api.airtable.com/v0/appRokysVIYeDAEgA/Contact%20Us",
        data: data,
        headers: {
          "Authorization": "Bearer keyhIGB1sKiwklGzU",
        },
      }).then(function(response) {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
        window.location.href = "/thanks"
      })
    }
    else {
      alert("Please a message")
    }
  }
  render() {
    const { props } = this

    const { head } = props

    return (
      <div>
        <Helmet
          title={ head.title }
        />
        <Ribbon title={ "Contact Us" } />
        <Content className={ classNames(styles.main) }>
          <Grid className={ classNames(styles.container) }>
            <Cell
              col={ 2 }
              hidePhone
              hideTablet
            />
            <Cell
              col={ 8 }
              shadow={ 2 }
              className={ classNames(styles.content, "mdl-color--white") }
            >
              <Card>
                <div>
                  <form onSubmit={ this.handleSubmit }>
                    <div>
                      <Textfield
                        onChange={ this.handleChange }
                        data-input="name"
                        value={ this.state.name }
                        label="Name"
                        floatingLabel
                        style={ { width: "200px" } }
                      />
                      <Textfield
                        onChange={ this.handleChange }
                        data-input="email"
                        value={ this.state.email }
                        label="Email"
                        floatingLabel
                        style={ { width: "200px" } }
                      />
                      <Textfield
                        onChange={ this.handleChange }
                        data-input="company"
                        value={ this.state.company }
                        label="Company"
                        floatingLabel
                        style={ { width: "200px" } }
                      />
                      <Textfield
                        onChange={ this.handleChange }
                        data-input="phone"
                        value={ this.state.phone }
                        label="Phone"
                        floatingLabel
                        style={ { width: "200px" } }
                      />
                      <Textfield
                        onChange={ this.handleChange }
                        label="Enter your message..."
                        rows={ 3 }
                        data-input="text"
                        value={ this.state.text }
                        style={ { width: "200px" } }
                      />
                    </div>
                    <div>
                      <Button type="submit">
                        Get in touch
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </Cell>
          </Grid>
        </Content>
      </div>
    )
  }
}
