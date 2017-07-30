import React, { Component, PropTypes } from "react";
import { fetchPost, deletePost } from "../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router";

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeletePost() {
    this.props.deletePost(this.props.params.id).then(() => {
      this.context.router.push("/");
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <Link to="/">Back to index</Link>
        <button
          className="btn btn-primary btn-danger pull-xs-right"
          onClick={this.onDeletePost.bind(this)}
        >
          Delete Post
        </button>
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

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
