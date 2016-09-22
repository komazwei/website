import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import classNames from "classnames"
import { BodyContainer } from "phenomic"
import { Content, Grid, Cell } from "react-mdl"
import Ribbon from "../../components/Ribbon"
import SiteFooter from "../../components/SiteFooter"

import styles from "./RibbonPage.scss"

class RibbonPage extends Component {

  render() {
    const { props } = this

    const { head, body } = props

    return (
      <div>
        <Helmet
          title={ head.title }
        />
        <Ribbon title={ head.title } />
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
              <BodyContainer>
                { body }
              </BodyContainer>
            </Cell>
          </Grid>
        </Content>
        <SiteFooter />
      </div>
    )
  }
}

RibbonPage.propTypes = {
  head: PropTypes.object.isRequired,
}

export default RibbonPage
