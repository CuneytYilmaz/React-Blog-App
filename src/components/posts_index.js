import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/index";
import { Link } from "react-router";

class PostsIndex extends Component {
  // This lifecycle method runs only this component render to DOM
  componentWillMount() {
    console.log("now");
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a post
          </Link>
        </div>
        A list of blog posts.
      </div>
    );
  }
}

export default connect(null, { fetchPosts })(PostsIndex);
