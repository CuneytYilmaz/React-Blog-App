import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { createPost } from "../actions/index";

class PostsNew extends Component {
  render() {
    const { handleSubmit, fields: { title, categories, content } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create A New Post</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div>
            {title.touched ? title.error : ""}
          </div>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea className="form-control" {...content} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

function validate(props) {
  const errors = {};
  if (!props.title) {
    errors.title = "Enter a username";
  }
  return errors;
}

// connect : 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm : 1st argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm(
  {
    form: "PostsNewForm",
    fields: ["title", "categories", "content"],
    validate
  },
  null,
  { createPost }
)(PostsNew);
