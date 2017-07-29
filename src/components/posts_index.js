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

  renderPosts() {
    console.log(this.props.posts);
    return this.props.posts.map(post => {
      return (
        <li key={post.id} className="list-group-item">
          <strong>
            {post.title}
          </strong>
          <span className="pull-xs-right">
            {post.categories}
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
