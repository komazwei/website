/* @flow */
import React, { PropTypes } from "react"
import { Grid, Row, Col } from "react-bootstrap"
import cx from "classnames"

//import styles from "./Lead.less"

const Lead = ({ title, description }) => {

  return (
    <section className={ cx("block") }>
      <div>
        <Grid>
          <Row>
            <Col className={cx("text-center")}>
              <h2>
                { title }
              </h2>
              <p>
                { description }
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    </section>
  )
}

Lead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Lead
