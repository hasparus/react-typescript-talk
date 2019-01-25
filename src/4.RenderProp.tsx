/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import React from "react";
import { Spring, config } from "react-spring";

import { render } from "./talkUtils";

type PointerPosition = {
  x: number;
  y: number;
};

type Props = {
  children: (_: PointerPosition) => React.ReactNode;
};

type State = {
  mousePosition?: PointerPosition;
};

export class PointerProvider extends React.Component<Props, State> {
  state: State = {};

  componentDidMount() {
    document.addEventListener("pointermove", this.handlePointerMove);
  }

  componentWillUnmount() {
    document.removeEventListener(
      "pointermove",
      this.handlePointerMove
    );
  }

  handlePointerMove = (event: PointerEvent) => {
    this.setState({
      mousePosition: {
        x: event.x,
        y: event.y,
      },
    });
  };

  render() {
    const { children } = this.props;
    const { mousePosition } = this.state;

    if (!mousePosition) {
      return "No pointer";
    }

    return children(mousePosition);
  }
}

render(
  <PointerProvider>
    {pointerPos => (
      <Stage>
        <Spring to={pointerPos} config={config.gentle}>
          {({ x, y }) => (
            <SolarSystem
              x={x}
              y={y}
              isMoving={pointerPos.x !== x || pointerPos.y !== y}
            >
              <Earth />
            </SolarSystem>
          )}
        </Spring>
      </Stage>
    )}
  </PointerProvider>
);

const Stage = (props: React.ComponentProps<"div">) => (
  <div
    css={css`
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #111;
      cursor: none;
      user-select: none;
      overflow: hidden;
    `}
    {...props}
  />
);

type SolarSystemProps = {
  x: number;
  y: number;
  children?: React.ReactNode;
} & SunProps;

const SolarSystem = ({
  x,
  y,
  isMoving,
  children,
}: SolarSystemProps) => (
  <div
    style={{
      position: "absolute",
      transform: `translate3d(
        calc(${x}px - 50%),
        calc(${y}px - 50%), 
        0)`,
    }}
  >
    <Sun isMoving={isMoving} />
    {children}
  </div>
);

type SunProps = { isMoving: boolean };
const Sun = ({ isMoving }: SunProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "50px",
      lineHeight: 1,
      transformOrigin: "center",
      position: "relative",
    }}
  >
    🌞
    <SunGlow opacity={isMoving ? 0 : 1} />
  </div>
);

const SunGlow = ({ opacity }: { opacity: number }) => (
  <div
    style={{
      opacity,
      position: "absolute",
      width: 40,
      height: 40,
      borderRadius: "50%",
      boxShadow: "0 0 100px rgba(255, 205, 0, 0.5)",
      transition: "opacity 1s ease-in",
    }}
  />
);

const orbit = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(-360deg);
  }
`;

const inverseOrbit = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
`;

const Earth = () => (
  <div
    css={css`
      position: absolute;
      left: 100px;
      top: 100px;
      transform-origin: -100px -100px;
      animation: ${orbit} 10s linear infinite;
    `}
  >
    <div
      css={css`
        animation: ${inverseOrbit} 10s linear infinite;
      `}
    >
      🌎
    </div>
  </div>
);

// Workaround for CodeSandbox
(window as any)._jsx = jsx;
