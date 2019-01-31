import React, { ReactNode, createContext, useContext } from "react";
import { Assign } from "utility-types";

import { FunToggle, FunToggleProps } from "./stuff";
import { render } from "./talkUtils";

// https://reactjs.org/docs/context.html
type FormiqueChildProps<Values> = {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Partial<Values>>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

type FormContextPayload<Values> =
  | FormiqueChildProps<Values>
  | undefined;

const FormStateContext = createContext<FormContextPayload<unknown>>(
  undefined
);

type FormiqueProps<Values> = {
  children: (_: FormiqueChildProps<Values>) => ReactNode;
  initialValues: Values;
  onSubmit: (_: Values) => void;
};

// Formik: https://github.com/jaredpalmer/formik
class Formique<Values> extends React.PureComponent<
  FormiqueProps<Values>
> {
  state = this.props.initialValues;

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleValuesChange = this.setState.bind(this);

  render() {
    const { children } = this.props;

    const childProps = {
      values: this.state,
      setValues: this.handleValuesChange,
      handleSubmit: this.handleSubmit,
    };

    const { Provider } = FormStateContext as React.Context<
      FormContextPayload<Values>
    >;

    return (
      <Provider value={childProps}>{children(childProps)}</Provider>
    );
  }
}

type InputProps<Name> = Assign<
  React.ComponentProps<"input">, // <- this one rocks, mention it
  {
    name: Name;
    value?: never;
    onChange?: never;
  }
>;

class Input<Name extends string> extends React.Component<
  InputProps<Name>
> {
  static contextType = FormStateContext;
  //context!: React.ContextType<typeof FormStateContext>;
  context!: FormiqueChildProps<{ [key in Name]: string }>;

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = this.props;

    this.context.setValues({
      [name]: event.target.value,
    } as { [key in Name]: string });
  };

  render() {
    const { name, ...rest } = this.props;
    const {
      values: { [name]: value },
    } = this.context;

    return (
      <input {...rest} value={value} onChange={this.handleChange} />
    );
  }
}

type ToggleProps<Name extends string> = {
  name: Name;
};
function Toggle<
  Name extends string,
  Values extends Record<Name, boolean> = Record<Name, boolean>
>({ name }: ToggleProps<Name>) {
  const {
    values: { [name]: value },
    setValues,
  } = useContext(FormStateContext as React.Context<
    FormContextPayload<Values>
  >)!; // <- notice the "!"
  // I expect runtime error if Toggle is used outside of Formique

  return (
    <FunToggle
      value={value}
      onChange={newValue =>
        setValues({
          [name]: newValue,
        } as Partial<Values>)
      }
    />
  );
}

render(
  <div>
    <Formique
      initialValues={{
        meetupTitle: "Wrocław TypeScript #1",
        isMeetupFun: false,
      }}
      onSubmit={console.log}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Meetup:</span>
            <Input name="meetupTitle" />
          </label>
          <label>
            <span>Fun:</span>
            <Toggle name="isMeetupFun" />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </Formique>
  </div>
);

// Some motivation behind render props by Micheal Jackson,
// creator of React Router
// https://www.youtube.com/watch?v=BcVAq3YFiuc

// https://github.com/facebook/react/issues/14099
// useCallback() invalidates too often in practice

const initialFormValues = {
  meetupTitle: "Wrocław TypeScript #1",
  isMeetupFun: false,
};

type FormValues = typeof initialFormValues;
