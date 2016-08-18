import React, { Component, PropTypes } from "react"
import Page from "../../layouts/Page"
import PostItem from "./PostItem"
import { Link } from "react-router"
import styles from "./Blog.scss"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Icon from "../../components/Icon"

export default class Blog extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  };

  get collection() {
    return enhanceCollection(this.context.collection, {
      filter: (t) => {
        const isPost = t.layout === "Post"
        if (process.env.NODE_ENV === "production") {
          return (t.draft === undefined && isPost)
        }
        return isPost
      },
      sort: "date",
      reverse: true,
      limit: 10,
    }).map(PostItem)
  }

  render() {
    const {
      collection,
    } = this.context

    return (
      <Page
        head={ {
          title: "Blog",
        } }
        __url="/"
      >
        {
          Boolean(!collection || !collection.length) &&
            <p>{ 'No entry' }</p>
        }
        {
          Boolean(collection && collection.length) &&
            <div>{ this.collection }</div>
        }
        <div className={ styles.btnWrapper }>
          <Link
            className={ styles.btnOlder }
            to="/archive/"
          >
            { 'Archive' }
            <Icon icon="right-open-big" />
          </Link>
        </div>
      </Page>
    )
  }
}
