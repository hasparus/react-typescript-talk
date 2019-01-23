import { css, jsx } from "@emotion/core";
import React from "react";

export function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      css={{
        color: "red",
        height: "2em",
        maxWidth: "100%",
      }}
    >
      {children}
    </p>
  );
}
