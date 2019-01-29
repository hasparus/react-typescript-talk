import React from "react";

import { render } from "./talkUtils";
import { ErrorMessage } from "./stuff";

type Props = {
  onSubmit: (_: SimpleUser) => void;
};

type SimpleUser = {
  name: string;
  email: string;
};

type State = SimpleUser;

export class LoginForm extends React.Component<Props, State> {
  state = {
    name: "",
    email: "",
  };

  error: string | null = null;

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleEmailChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const value = event.target.value;
    this.setState({ email: value });
    this.error =
      !value || isEmail(value)
        ? null
        : "Email should look like '<sth>@<sth>.<tld>'";
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { name, email } = this.state;

    onSubmit({
      name,
      email,
    });
  };

  render() {
    const { name, email } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <ErrorMessage>{this.error}</ErrorMessage>
        <label>
          <span>Name:</span>
          <input
            value={name}
            maxLength={50}
            onChange={this.handleNameChange}
          />
        </label>
        <label>
          <span>Email:</span>
          <input value={email} onChange={this.handleEmailChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

render(<LoginForm onSubmit={console.log} />);

/* 
  code below would be in different files 
*/

// Email.ts

type Brand<T, B extends string> = T & {
  __brand: B;
};

type Email = Brand<string, "Email">;

const EMAIL_REGEX = /.+@.+\..+/;

const isEmail = (s: string): s is Email =>
  Boolean(s.match(EMAIL_REGEX));
