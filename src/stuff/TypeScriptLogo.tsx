import React from "react";
import { Omit } from "utility-types";

export const TypeScriptLogo = (
  props: Omit<React.ComponentProps<"img">, "src">
) => (
  <img
    src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png"
    {...props}
  />
);
