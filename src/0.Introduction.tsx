// @jsx jsx
import { css, jsx } from "@emotion/core";
import styled, { StyledComponent } from "@emotion/styled";
import React, { useState, useCallback } from "react";
import { useLocalStorage } from "react-use";

import { render } from "./talkUtils";
import { Hello } from "./1.StatelessComponent";
import { UnsplashImg } from "./components";

// *Open this one in separate full screen tab.*
// I don't want to show hooks before talking about stateless components.
// And text in the code will actually spoil the talk.

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type ArrowProps = Omit<AnchorProps, "href"> &
  (
    | { left: true; right?: never }
    | { right: true; left?: never });

const Arrow = (props: ArrowProps) => (
  <a
    href="javascript:;"
    css={css`
      text-decoration: none;
      width: 2em;
      height: 2em;
      border: 1px solid transparent;
      display: flex;
      justify-content: center;
      align-items: center;

      :hover,
      :focus {
        border-color: black;
      }
      outline: none;
    `}
    {...props}
  >
    {props.left ? "<" : ">"}
  </a>
);

const steps = [
  <Hello author="hasparus" />,
  "Why should I use TypeScript?",
  <h1>Feelings</h1>,
  <UnsplashImg
    id="AkTBCrrX0dI"
    photographer="abi ismail"
  />,
  <UnsplashImg id="Ju-ITc1Cc0w" photographer="J W" />,
  <div>
    <UnsplashImg id="Ju-ITc1Cc0w" photographer="J W" />
  </div>,
];
const mod = (x: number) =>
  (x + steps.length) % steps.length;

function Introduction() {
  const [step, setStep] = useLocalStorage("step", 0);
  const goToNext = useCallback(
    () => setStep(x => mod(x + 1)),
    []
  );
  const goToPrevious = useCallback(
    () => setStep(x => mod(x - 1)),
    []
  );
  const handleInputValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setStep(mod(Number(event.target.value))),
    []
  );

  return (
    <div>
      {steps[step]}
      <footer
        css={css`
          overflow: hidden;
          bottom: 0;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          left: 0;
          padding: 5px 8px;
          position: absolute;
          width: 100%;
        `}
      >
        <Arrow left onClick={goToPrevious} />
        <div>
          <input
            type="number"
            min={0}
            max={steps.length - 1}
            value={step}
            onChange={handleInputValueChange}
            style={{
              width: "1.2em",
              borderBottom: "none",
              marginRight: 0,
              borderRadius: 0,
            }}
          />
          / {steps.length - 1}
        </div>
        <Arrow right onClick={goToNext} />
      </footer>
    </div>
  );
}

render(jsx(Introduction));
