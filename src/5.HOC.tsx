import React from "react";
import { Subtract } from "utility-types";

import { PointerProvider } from "./4.RenderProp";
import { render } from "./talkUtils";

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

// Props attached by HOC
interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
}

interface MakeCounterState {
  value: number;
}

// Shamelessly stolen from  https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
const withCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Subtract<P, InjectedCounterProps> & MakeCounterProps,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0,
    };

    increment = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.maxValue
            ? prevState.value
            : prevState.value + 1,
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.minValue
            ? prevState.value
            : prevState.value - 1,
      }));
    };

    render() {
      const { minValue, maxValue, ...props } = this
        .props as MakeCounterProps;
      return (
        <Component
          {...props}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };

type DumbCounterProps = {
  color?: string;
} & InjectedCounterProps;

const DumbCounter = ({
  value,
  onDecrement,
  onIncrement,
  color = "black",
}: DumbCounterProps) => (
  <div>
    <button onClick={onDecrement}>-</button>
    <span
      style={{
        color,
        padding: "0 1em",
      }}
    >
      {value}
    </span>
    <button onClick={onIncrement}>+</button>
  </div>
);

const Counter = withCounter(DumbCounter);

render(<Counter minValue={0} maxValue={5} />);
