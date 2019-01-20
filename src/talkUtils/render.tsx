import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Color } from "../components";

const globalStyles = css`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SlideStylesContainer = styled.div`
  font-size: 24px;
  font-family: monospace;
  max-width: 100%;

  a {
    :visited {
      color: blue;
    }
  }
  form {
    button[type="submit"] {
      float: right;
      margin: 0.5em;
    }
  }
  li {
    padding: 0.5em 0;
  }
  label {
    padding: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: right;

    span {
      width: 6em;
      margin-right: 0.5em;
    }

    input {
      flex: 1;
    }
  }
  input {
    font-size: inherit;
    font-family: inherit;
    padding: 0;
    border: none;
    border-bottom: 1px solid ${Color.LightGray};
    :focus {
      outline: none;
      border-color: black;
      background: ${Color.SuperLightGray};
      border-radius: 5px 5px 0 0;
    }
  }
  button {
    background: ${Color.SuperLightGray};
    color: black;
    font-size: inherit;
    font-family: inherit;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0.1em 0.5em;
    cursor: pointer;

    :hover,
    :focus {
      color: white;
      background: black;
    }
    :active {
      transform: scale(1.1);
    }
  }
`;

const ModuleName = styled.small`
  position: absolute;
  top: 1em;
  left: 1em;
  font-size: 14px;
  font-style: italic;
  color: #333;
`;

function makeRoot() {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  return root;
}

function getRoot() {
  return document.getElementById("root") || makeRoot();
}

function getRenderedModuleName() {
  const stack = new Error().stack;
  if (stack) {
    const matched = (stack.match(/src\/(.+\.tsx)/g) || [])[2];
    return matched && matched.split("/").pop();
  }
  return undefined;
}

export function render(node: React.ReactNode) {
  const moduleName = getRenderedModuleName();
  ReactDOM.render(
    <SlideStylesContainer>
      <Global styles={globalStyles} />
      {node}
      <ModuleName>{moduleName || null}</ModuleName>
    </SlideStylesContainer>,
    getRoot()
  );
}
