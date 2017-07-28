import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/index";

class PostsIndex extends Component {
  // This lifecycle method runs only this component render to DOM
  componentWillMount() {
    console.log("now");
    this.props.fetchPosts();
  }

  render() {
    return <div>A list of blog posts.</div>;
  }
}

export default connect(null, { fetchPosts })(PostsIndex);
