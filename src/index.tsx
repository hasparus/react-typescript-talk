import * as React from "react";
import { render } from "./talkUtils";

function Hello() {
  return (
    <article>
      <h1>Get Ready</h1>
      <ul>
        <li>Shades of Purple&nbsp;🎨</li>
        <li>Font Size 22 & Zoom 150% 🔎</li>
        <li>Zen Mode 👨‍🦲</li>
      </ul>
    </article>
  );
}

render(<Hello />);
