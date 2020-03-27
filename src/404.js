/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment, hydrate } from "preact";

const App = () => {
    return (
        <h1>404 - Not Found</h1>
    )
}

const Head = () => {
    return null
}

if (typeof window !== "undefined") {
    hydrate(<App />, document.getElementById("root"));
  } else module.exports = {
    component: App,
    head: Head
  };
  