import * as React from "react";
import { render } from "./talkUtils";

const socialSites = ["twitter", "github", "facebook"];

interface HelloProps {
  author: string;
}

export const Hello = ({ author }: HelloProps) => (
  <article>
    <h1>Hello! 👋</h1>
    <p>
      If you'd like to talk you can find me as @{author} at
    </p>
    <ul>
      {socialSites.map(social => (
        <li>
          <a href={`https://${social}.com/${author}`}>
            {social}
          </a>
        </li>
      ))}
    </ul>
  </article>
);

render(<Hello author="hasparus" />);
