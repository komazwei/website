import React from "react"
import { Link } from "react-router"
import cx from "classnames"
import {Grid,Row,Col} from "react-bootstrap"

const SiteFooter = () => {

  return (
    <Grid className={cx("block","block-inverse","footer")}>
      <Row>
        <Col>
          <Link to={ "/docs" }>{ "Help" }</Link>
          <Link to={ "/privacy" }>{ "Privacy" }</Link>
          <Link to={ "/terms" }>{ "Terms" }</Link>
        </Col>
      </Row>
    </Grid>
  )
}

export default SiteFooter
