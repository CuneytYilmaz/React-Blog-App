import React, { Component } from "react";
import { fetchPost } from "../actions/index";
import { connect } from "react-redux";

class PostsShow extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <h3>
          {post.title}
        </h3>
        <h6>
          Categories : {post.categories}
        </h6>
        <p>
          {post.content}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
