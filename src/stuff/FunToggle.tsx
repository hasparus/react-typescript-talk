// @jsx jsx
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useMemo } from "react";
import { Omit } from "utility-types";

import { render } from "../talkUtils";

import { Color } from "./color";

const Flipper = styled.div`
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
  transform-origin: 100% 50%;
  overflow: visible;

  display: flex;
  width: 8em;
  height: 1em;
  justify-content: center;
  align-items: center;

  user-select: none;

  input:checked + & {
    transform: rotateX(180deg);
  }
`;

const Side = styled.div`
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Front = styled(Side)`
  z-index: 2;
  transform: rotateX(0deg);

  white-space: pre;
`;

const Back = styled(Side)`
  transform: rotateX(180deg);
`;

export type FunToggleProps = Omit<
  React.ComponentProps<"input">,
  "checked" | "value" | "type" | "onChange"
> & {
  value?: boolean;
  onChange: (_: boolean) => void;
};

export const FunToggle = ({
  value,
  onChange,
  ...rest
}: FunToggleProps) => {
  const handleChange = useMemo(
    () =>
      onChange &&
      ((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
      }),
    [onChange]
  );

  return (
    <label
      css={css`
        border: 1px solid transparent;
        outline: none;

        cursor: pointer;

        :hover,
        :focus {
          border: 1px solid ${Color.LightGray};
          border-radius: 5px;
        }
      `}
      tabIndex={0}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        css={css`
          display: none;
        `}
        {...rest}
      />
      <Flipper>
        <Front>nah</Front>
        <Back>🍺🍕💻🎶🍻</Back>
      </Flipper>
    </label>
  );
};

// render(<FunToggle onChange={console.log} />);

const codeSandboxStopRemovingMyVariable = jsx;
