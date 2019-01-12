import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import * as ReactDOM from "react-dom";

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
    width: 389px;

    display: flex;
    flex-direction: column;

    button[type="submit"] {
      align-self: flex-end;
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

    span {
      width: 6em;
    }

    input {
      margin-left: 0.5em;
      flex: 1;
    }
  }
  input {
    font-size: inherit;
    font-family: inherit;
    padding: 0;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    :focus {
      outline: none;
      border-color: black;
      background: rgba(20, 20, 20, 0.05);
      border-radius: 5px 5px 0 0;
    }
  }
  button {
    background: rgba(20, 20, 20, 0.05);
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
  return new Error().stack
    .split("\n")[3]
    .match(/src\/(.+\.tsx)/)[1];
}

export function render(node: React.ReactNode) {
  const moduleName = getRenderedModuleName();
  ReactDOM.render(
    <SlideStylesContainer>
      <Global styles={globalStyles} />
      {node}
      <ModuleName>{moduleName}</ModuleName>
    </SlideStylesContainer>,
    getRoot()
  );
}
