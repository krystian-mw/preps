/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment, hydrate } from "preact";

const Head = () => {
  return (
    <>
      <link rel="stylesheet" href="/css/style.css" />
    </>
  );
};

const App = () => {
  const buttonClick = () => {
    alert("clicked");
  };
  return (
    <>
      <h1>hello new!</h1>
      <button onClick={buttonClick}>Click Me</button>
    </>
  );
};

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("root"));
} else
  module.exports = {
    component: App,
    head: Head
  };
