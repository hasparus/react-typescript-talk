import * as React from "react";
import { render } from "./talkUtils";

const socialSites = ["twitter", "github", "facebook"];

interface HelloProps {
  handle?: string;
  whoAmI?: string;
}

export const Hello: React.FC<HelloProps> = ({
  handle,
  whoAmI,
}) => (
  <article>
    <h1>Hello! 👋</h1>
    <p>
      I'm {whoAmI}.
      <br />
      If you'd like to talk you can find me as @{handle} at
    </p>
    <ul>
      {socialSites.map(social => (
        <li key={social}>
          <a href={`https://${social}.com/${handle}`}>
            {social}
          </a>
        </li>
      ))}
    </ul>
  </article>
);

Hello.defaultProps = {
  handle: "hasparus",
  whoAmI: "Piotr Pietrzak",
};

render(<Hello whoAmI="super stressed right now 😱" />);

// https://github.com/Microsoft/TypeScript/issues/23812
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html
