import * as React from "react";

import { render } from "./talkUtils";

// # Support for defaultProps in JSX
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html
// https://github.com/Microsoft/TypeScript/issues/23812

interface PropsDisplayProps {
  iNeedThis: boolean;
  andThisOneHasDefault: boolean;
}

class PropsDisplay extends React.Component<PropsDisplayProps> {
  static defaultProps = {
    andThisOneHasDefault: false,
  };

  render() {
    return <pre>{JSON.stringify(this.props, null, 2)}</pre>;
  }
}

render(<PropsDisplay iNeedThis />);
