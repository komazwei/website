/* @flow */
import React, { PropTypes } from "react"
import classNames from "classnames"
import { Content, Grid, Cell, Card, CardText, Icon } from "react-mdl"
import Page from "../Page"
import Ribbon from "../../components/Ribbon"
import styles from "./Contact.less"

const Contact = (props) => {

  const mapUrl = "https://api.mapbox.com/" +
  "styles/v1/agrista/" +
  "citfw8fl800242jq5qus343f0/" +
  "static/18.445252,-33.925787,11.83,0.00,0.00/" +
  "600x400@2x?access_token=pk.ey" +
  "J1IjoiYWdyaXN0YSIsImEiOiJXZThUTk53In0." +
  "Sa4Yqi0MjROOsv8LX3524A"

  return (
    <Page { ...props }>
      <Ribbon
        title={ "Contact Us" }
      />
      <Content
        component={ "main" }
        className={ classNames(styles.main) }
      >
        <Grid
          component={ "section" }
          className={ classNames(styles.container) }
          noSpacing
        >
          <Cell
            col={ 2 }
            hidePhone
            hideTablet
          />
          <Cell
            component={ Card }
            col={ 8 }
            shadow={ 2 }
            className={ classNames(styles.card) }
          >
            <Grid component={ CardText } noSpacing>
              <Cell
                className={ classNames(styles.sectionCircleContainer) }
                col={ 2 }
                phone={ 1 }
              >
                <div
                  className={ classNames(styles.icon) }
                >
                  <Icon name={ "location_city" } />
                </div>
              </Cell>
              <Cell
                className={ "section__text" }
                col={ 10 }
                tablet={ 6 }
                phone={ 3 }
              >
                <h3>
                  { "Main Adress" }
                </h3>
                <p>
                  { "Unit 401A" }
                </p>
                <p>
                  { "66 Albert Road" }
                </p>
                <p>
                  { "Woodstock" }
                </p>
                <p>
                  { "South Africa" }
                </p>
              </Cell>
              <Cell
                className={ classNames(styles.sectionCircleContainer) }
                col={ 2 }
                phone={ 1 }
              >
                <div
                  className={ classNames(styles.icon) }
                >
                  <Icon name={ "phone" } />
                </div>
              </Cell>
              <Cell
                className={ "section__text" }
                col={ 10 }
                tablet={ 6 }
                phone={ 3 }
              >
                <h3>
                  { "Contact Details" }
                </h3>
                <p>
                  { "+27 21 201 1171" }
                </p>
                <p>
                  { "info@agrista.com" }
                </p>
              </Cell>
              <Cell
                col={ 12 }
                className={ classNames(styles.map) }
              >
                <img
                  src={ mapUrl }
                  width="600"
                  height="400"
                  alt="Outdoors"
                />
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </Content>
    </Page>
  )
}

Contact.propType = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  __filename: PropTypes.string.isRequired,
//    __url: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired
}

export default Contact
