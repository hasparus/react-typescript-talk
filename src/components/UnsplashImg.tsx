import React from "react";

type UnsplashImgProps = {
  id: string;
  size?: string;
};

export const UnsplashImg: React.FunctionComponent<
  UnsplashImgProps
> = ({ id, size }) => (
  <img src={`https://source.unsplash.com/${id}/${size}`} />
);

UnsplashImg.defaultProps = {
  size: "",
};
