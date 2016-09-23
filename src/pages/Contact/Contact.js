/* @flow */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import classNames from "classnames"
import { Content, Grid, Cell, Card, CardText, Icon } from "react-mdl"
import Ribbon from "../../components/Ribbon"
import styles from "./Contact.scss"

export default class Contact extends Component {

  static propType = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string.isRequired,
//    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
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
          <Grid component={ "section" } className={ classNames(styles.sectionCenter) } shadow={ 0 } noSpacing>
            <Cell component={ Card } col={ 12 }>
              <Grid component={ CardText } noSpacing>
                <Cell component="h4" col={ 12 }>
                  { "" }
                </Cell>
                <Cell
                  className={ classNames(styles.sectionCircleContainer) }
                  col={ 2 }
                  phone={ 1 }
                >
                  <div
                    className={ classNames(styles.icon) }
                  >
                    <Icon name="location_city" />
                  </div>
                </Cell>
                <Cell className="section__text" col={ 10 } tablet={ 6 } phone={ 3 }>
                  <h5>Main Adress</h5>
                  <div>
                    <p>
                      <span>
                        { "Unit 401A" }
                      </span>
                      <span>
                        { "66 Albert Road" }
                      </span>
                      <span>
                        { "Woodstock" }
                      </span>
                      <span>
                        { "South Africa" }
                      </span>
                    </p>
                  </div>
                </Cell>
                <Cell
                  className={ classNames(styles.sectionCircleContainer) }
                  col={ 2 }
                  phone={ 1 }
                >
                  <div
                    className={ classNames(styles.icon) }
                  >
                    <Icon name="phone" />
                  </div>
                </Cell>
                <Cell className="section__text" col={ 10 } tablet={ 6 } phone={ 3 }>
                  <h5>Contact Details</h5>
                  <div>
                    <p>
                      <span>
                        { "+27 21 201 1171" }
                      </span>
                      <span>
                        { "info@agrista.com" }
                      </span>
                    </p>
                  </div>
                </Cell>
                <Cell
                  col={ 12 }
                >
                  <img
                    src="https://api.mapbox.com/styles/v1/agrista/citfw8fl800242jq5qus343f0/static/18.445252,-33.925787,11.83,0.00,0.00/600x400@2x?access_token=pk.eyJ1IjoiYWdyaXN0YSIsImEiOiJXZThUTk53In0.Sa4Yqi0MjROOsv8LX3524A" width="600"height="400"alt="Outdoors"
                    className={ classNames(styles.map) }
                  />
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </Content>
      </div>
    )
  }
}
