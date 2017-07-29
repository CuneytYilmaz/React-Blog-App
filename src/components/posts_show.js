import React, { Component } from "react";

class PostsShow extends Component {
  render() {
    return (
      <div>
        Post id is {this.props.params.id}
      </div>
    );
  }
}

export default PostsShow;
