import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import classNames from "classnames"
import { BodyContainer } from "phenomic"
import { Content, Grid, Cell } from "react-mdl"
import Ribbon from "../../components/Ribbon"

import styles from "./RibbonPage.scss"

const RibbonPage = (props) => {

  return (
    <div>
      <Helmet
        title={ props.head.title }
      />
      <Ribbon title={ props.head.title } />
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
              { props.body }
            </BodyContainer>
          </Cell>
        </Grid>
      </Content>
    </div>
  )
}

RibbonPage.propTypes = {
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
}

export default RibbonPage
