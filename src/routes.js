import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import PostsIndex from "./components/posts_index";

const Greeting = () => {
  return <div>Hi this is children component.</div>;
};

export default (
  <Route component={App} path="/">
    <IndexRoute component={PostsIndex} />
    <Route path="greet" component={Greeting} />
    <Route path="greet2" component={Greeting} />
    <Route path="greet3" component={Greeting} />
  </Route>
);
