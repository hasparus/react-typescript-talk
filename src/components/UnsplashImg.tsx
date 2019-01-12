// @jsx jsx
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

// Workaround. Jsx gets thrown out if used only in pragma :>
// This works in normal code without issues.
const codeSandboxPlz = jsx;

type UnsplashImgProps = {
  id: string;
  photographer: string;
  size?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const UnsplashImg: React.FunctionComponent<
  UnsplashImgProps
> = ({ id, size, photographer, ...rest }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
  >
    <img
      src={`https://source.unsplash.com/${id}/${size}`}
      css={{
        maxWidth: "100vw",
      }}
      {...rest}
    />
    <small
      css={{
        paddingTop: "0.5em",
      }}
    >
      Photo by{" "}
      <a
        href={`https://unsplash.com/photos/${id}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`}
      >
        {photographer}
      </a>{" "}
      on Unsplash
    </small>
  </div>
);

UnsplashImg.defaultProps = {
  size: "",
};
