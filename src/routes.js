import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";

export default (
  <Route component={App} path="/">
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
  </Route>
);
