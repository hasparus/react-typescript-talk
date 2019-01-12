import React, {
  useState,
  useCallback,
  useMemo,
} from "react";
import { render } from "./talkUtils";

type Props = {
  onSubmit: (_: SimpleUser) => void;
};

type SimpleUser = {
  name: string;
  email: string;
};

type State = SimpleUser;

export function LoginForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = useCallback(event => {
    setName(event.target.value);
  }, []);

  const handleEmailChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      onSubmit({
        name,
        email,
      });
    },
    [name, email]
  );

  const error = useMemo(
    () =>
      email && !isEmail(email)
        ? "Email should look like '<sth>@<sth>.<tld>'"
        : null,
    [email]
  );

  return (
    <form onSubmit={handleSubmit}>
      <ErrorMessage>{error}</ErrorMessage>
      <label>
        <span>Name:</span>
        <input
          value={name}
          maxLength={50}
          onChange={handleNameChange}
        />
      </label>
      <label>
        <span>Email:</span>
        <input value={email} onChange={handleEmailChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

render(<LoginForm onSubmit={console.log} />);

/* 
  code below would be in different files 
*/

// ErrorMessage.tsx
function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      style={{
        color: "red",
        height: "2em",
        maxWidth: "100%",
      }}
    >
      {children}
    </p>
  );
}

// Email.ts

type Brand<T, B extends string> = T & { __brand: B };

type Email = Brand<string, "Email">;

const EMAIL_REGEX = /.+@.+\..+/;

const isEmail = (s: string): s is Email =>
  Boolean(s.match(EMAIL_REGEX));
