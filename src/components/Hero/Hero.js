/* @flow */
import React, { PropTypes } from "react"
import cx from "classnames"
//import { Link } from "react-router"
//import { Grid, Cell } from "react-mdl"
import { Jumbotron, Grid, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap"


import styles from "./Hero.less"

const Hero = ({ title, cta }) => {

  return (
    <div className={cx(styles.background)}>
      <Grid className={cx(styles.overlay)}>
        <Row>
          <Col md={6}>
            <Jumbotron>
              <h1>{ title}</h1>
              <LinkContainer
                to="/store"
              >
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  className={cx("btn-raised",styles.cta)}
                >
                  { cta }
                </Button>
              </LinkContainer>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
}

export default Hero
