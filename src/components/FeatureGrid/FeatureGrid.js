import React, { PropTypes } from "react"
// import { Link } from "react-router"
import cx from "classnames"
import { Grid, Row, Col } from "react-bootstrap"
import invariant from "invariant"
import styles from "./FeatureGrid.less"

const FeatureGrid = (props) => {
  invariant(
    props.head && props.head.featureHighlights,
    "Home page needs a feature grid list"
  )

  return (
    <section className={ cx("bock","block-feature-grid") }>
      <Grid>
        <Row>
          {
            props.head && props.head.featureHighlights &&
            props.head.featureHighlights.map((featureHighlight) => {
              return (
                <Col key={ featureHighlight.name } sm={8} smOffset={2} md={4} className={cx("text-center")}>
                  <div className={ cx(styles.image) }>
                    <i className={ "material-icons" }>
                      { featureHighlight.icon }
                    </i>
                  </div>
                  <h4>{ featureHighlight.title }</h4>
                  <p>{ featureHighlight.description }</p>
                </Col>
              )
            })
          }
        </Row>
      </Grid>
    </section>
  )
}

FeatureGrid.propTypes = {
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired
}

export default FeatureGrid
