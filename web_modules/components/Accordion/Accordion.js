import React from "react"
import cs from "classnames"

import styles from "./Accordion.scss"

// Accordian Class
// Dynamic/Recursive
// a parent>child>child... relationship is required
// the whole object can be named however you like,
// but each child object needs to be identified as "children"
class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openLevelRow: "", // this is the current open level row in an accordian (starts out with none being open)
      selfLevelObject: props.newLevel // the current level object containing all rows and their data/children
    };
  }

  // This is our toggle open/close method
  // if row is already open, close it
  // uniqueSelector is unique per row, and also a key
  // in the selfLevelObject (could be a name, id)
  toggleOpenClose(uniqueSelector) {
    // simple ternary assignment
    this.setState({
      openLevelRow: this.state.openLevelRow != uniqueSelector ? uniqueSelector : ""
    });
  }

  render () {
    // deconstruct assignment from state
    const { selfLevelObject, openLevelRow } = this.state

    return (
      <div>
        {selfLevelObject.map((row, i) =>
        {/* Collectively where all children of the same hierchy level are listed*/}
        <div className="accordian-hold-self-level" key={i} >
        {/* This is an individual collapsable Row */}
        <div onClick={this.toggleOpenClose.bind(this, row.uniqueSelector)} className="accordian-title-row">
          <p className='accordian-title'> {row.title}</p>
        </div>
        {/*
         When iterating the list, find out if a row has been opened
         */}
        {this.state.openLevelRow != row.uniqueSelector ? <span></span> :
          /*
           This code block is called if the current row is opened
           now we to need to find out if there are children,
           if not, then we are at the bottom, do what ever
           you'd like with the bottom row
           */
          selfLevelObject[uniqueSelector].children != undefined ?
            <Accordian newLevel={selfLevelObject[uniqueSelector].children} />
            : // else
          // TODO - whatever you want with bottom row
        }
      </div>
    )}
  </div>
  );
  }
}

Accordion.propTypes = {
  newLevel: React.PropTypes.object
}