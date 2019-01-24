// @jsx jsx
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useRef, useEffect } from "react";

import { FitScreenWidthBox } from "./FitScreenWidthBox";
import { Color } from "./color";

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
> = ({ id, width, height, photographer, ...rest }) => {
  const image = useRef<HTMLImageElement>(null);
  const size = `${width}x${height}`;

  useEffect(
    () => {
      if (image.current) {
        const { current } = image;

        if (!current.complete) {
          current.style.opacity = "0";
          current.addEventListener("load", () => {
            current.style.opacity = "1";
          });
        }
      }
    },
    [image]
  );

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FitScreenWidthBox
        width={Number(width)}
        height={Number(height)}
        css={{
          background: Color.SuperLightGray,
        }}
      >
        <img
          ref={image}
          src={`https://source.unsplash.com/${id}/${size}`}
          css={{
            maxWidth: "100vw",
          }}
          {...rest}
        />
      </FitScreenWidthBox>
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
};

UnsplashImg.defaultProps = {
  width: 1200,
  height: 700,
};
