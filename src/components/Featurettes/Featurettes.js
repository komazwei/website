/* @flow */
import React, { PropTypes } from "react"
import Featurette from "./Featurette"

// import styles from "./FeaturettesList.scss"

const Featurettes = ({ featurettes }) => {
  return (
    <div>
      { featurettes.map((featurette) => (
        <Featurette
          key={ featurette.name }
          image={ featurette.image }
          title={ featurette.title }
          description={ featurette.description }
          isReverse={ featurette.isReverse }
          isInverse={ featurette.isInverse }
          isImgBottom={ featurette.isImgBottom }
          isImgFull={ featurette.isImgFull }
        />
      )) }
    </div>
  )
}

Featurettes.propTypes = {
  featurettes: PropTypes.array.isRequired
}

export default Featurettes
