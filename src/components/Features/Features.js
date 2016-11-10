/* @flow */
import React, { PropTypes } from "react"
import { Grid, Row, Col } from "react-bootstrap"
import cx from "classnames"
import styles from "./Features.less"

const Features = ({features}) => {
  return (
    <section id="feature" className={cx("block","block-featureS")}>
      <div className={ cx(styles.aux) }>
        <Grid>
          <Row>
            { features.map((feature) => (
              <Col key={feature.name} sm={8} smOffset={2} md={4} className={cx("text-center")} >
                <img src={feature.image} />
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </Col>
            )) }
          </Row>
        </Grid>
      </div>
    </section>
  )
}

Features.propTypes = {
  features: PropTypes.array.isRequired
}

export default Features
