// @jsx jsx
import { css, jsx, ClassNames } from "@emotion/core";
import React from "react";

type FitScreenWidthBoxProps = React.ComponentProps<"div"> & {
  width: number;
  height: number;
};

export const FitScreenWidthBox = ({
  width,
  height,
  className,
  ...rest
}: FitScreenWidthBoxProps) => (
  <ClassNames>
    {({ css, cx }) => (
      <div
        css={cx(
          css({
            width,
            height: `calc(100vw / ${width} * ${height})`,
            maxWidth: "100vw",
            maxHeight: height,
          }),
          className
        )}
        {...rest}
      />
    )}
  </ClassNames>
);

const _ = jsx;
