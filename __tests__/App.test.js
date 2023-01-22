/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import App from "../client/src/App";

// eslint-disable-next-line no-undef
it("renders correctly", () => {
  // eslint-disable-next-line react/jsx-filename-extension
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
