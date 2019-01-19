import React, {
  ReactNode,
  createContext,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Assign } from "utility-types";

import { FunToggle, FunToggleProps } from "./components";
import { render } from "./talkUtils";
import { ErrorMessage } from "./2.StatefulClass";

// https://reactjs.org/docs/context.html

type FormiqueChildProps<Values = Record<string, any>> = {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
  handleSubmit: () => void;
};

type FormStateContextPayload<
  Values = Record<string, any>
> = FormiqueChildProps<Values> | undefined;

const FormStateContext = createContext<
  FormStateContextPayload
>(undefined);

type FormiqueProps<Values = Record<string, any>> = {
  children: (_: FormiqueChildProps<Values>) => ReactNode;
  initialValues: Values;
  onSubmit: (_: Values) => void;
};

// Formik: https://github.com/jaredpalmer/formik
function Formique<Values>({
  children,
  initialValues,
  onSubmit,
}: FormiqueProps<Values>) {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      onSubmit(values);
    },
    [values]
  );

  const childProps = useMemo(
    () => ({
      values,
      setValues,
      handleSubmit,
    }),
    [values]
  );

  return (
    <FormStateContext.Provider value={childProps}>
      {children(childProps)}
    </FormStateContext.Provider>
  );
}

// Much shorter than Props = React.DetailedHTMLProps<
//   React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
// >
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

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = this.props;

    this.context.setValues({
      [name]: event.target.value,
    } as { [key in Name]: string });
  };

  render() {
    const { name } = this.props;
    const {
      values: { [name]: value },
    } = this.context;

    return (
      <input
        {...this.props}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

const initialFormValues = {
  meetupTitle: "Wrocław TypeScript #1",
  isMeetupFun: false,
};

render(
  <div>
    <Formique
      initialValues={initialFormValues}
      onSubmit={window.alert}
    >
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Meetup:</span>
            <Input name="meetupTitle" />
          </label>
          <label>
            <span>Fun:</span>
            <Input name="isMeetupFun" />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </Formique>
  </div>
);

interface ToggleProps extends FunToggleProps {}
function Toggle({ name }: ToggleProps) {
  const {
    values: { [name]: value },
    setValues,
  } = useContext(FormStateContext);
  // Possible additional content:
  // We can type this better with own useContext.

  return (
    <FunToggle
      value={value}
      onChange={newValue =>
        setValues({
          [name]: newValue,
        })
      }
    />
  );
}

// Some motivation behind render props by Micheal Jackson,
// creator of React Router
// https://www.youtube.com/watch?v=BcVAq3YFiuc

// https://github.com/facebook/react/issues/14099
// useCallback() invalidates too often in practice
