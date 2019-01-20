/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

import { render } from "./talkUtils";

type MousePosition = {
  x: number;
  y: number;
};

type Props = {
  children: (_: MousePosition) => React.ReactNode;
};

type State = {
  mousePosition?: MousePosition;
};

class MouseProvider extends React.Component<Props, State> {
  state: State = {};
  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    const { children } = this.props;
    const { mousePosition } = this.state;

    if (!mousePosition) {
      return null;
    }

    return children(mousePosition);
  }
}

render(
  <MouseProvider>
    {({ x, y }) => (
      <Stage>
        <Sun x={x} y={y} />
      </Stage>
    )}
  </MouseProvider>
);

const Stage = (props: React.ComponentProps<"div">) => (
  <div
    css={css`
      width: 100%;
      height: 100%;
    `}
  />
);

const Sun = ({ x, y }) => (
  <div
    style={{
      position: "absolute",
      transform: `translate3d(${x}px, ${y}px, 0)`,
    }}
  >
    🌞
  </div>
);

const Earth = () => <div>🌎</div>;
