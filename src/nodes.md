Why use TypeScript? (umbrella pics)

- because of feelings. "Feelings"
- WTF Feelings bro?
- because it feels bad to have bugs
- (inverse umbrella pic)
- and it feels great to have someone taking care of you
- (girls umbrella pic)... having your back
- It feels great to get into the FLOW state.
- - To be at the top of your productivity. To do your best.

---

SHOULD I DO IT AT ALL? IT'S LIKE 10 MINUTES AT LEAST

Time for a little throwback.

I've got a question to all you folks,
who's been using TypeScript for some time.

Do you remember what `Omit` used to look like before TS 2.8?

```ts
type Diff<T extends string, U extends string> = ({
  [P in T]: P
} &
  { [P in U]: never } & { [x: string]: never })[T];

type Omit<T, K extends keyof T> = {
  [P in Diff<keyof T, K>]: T[P]
};
```

I was so happy when I found it.
My friend was trying to convert me from Flow to TypeScript,
because Flow typechecker was super laggy on our machines.
That was the moment I knew he was right from the begginning.

Back to twenty nineteen.
This is Omit today:

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
```

I believe it's a little bit more self documenting.
Why am I talking about `Omit`?
I have three reasons.

**The first one is** -- this is the first technical talk on the meetup,
and I may have imported 😅 Omit from a library in few of my slides
so I have to make sure everyone knows what it is :D

```ts
import { Omit } from "utility-types"; // 17k weekly downloads
```

BTW `utility-types` author is sitting beside you.

**The second one** -- I gotta make sure everyone here can read types.
There will be a lot of types.

**Third one**.
Well, I think it's a pretty nice representation
of TypeScript ecosystem state right know.
Okay, you gotta learn some stuff, but it's not that hard,
and it's becoming easier and easier.
`lib.d.ts` is getting bigger and more powerful and that's good,
because the more we have in "standard library", the less we have
to learn when entering new project
or building when starting one from scratch.

# Okay, let's get back to Omit

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// Exclude and Pick are builtins
// type Exclude<T, U> = T extends U ? never : T; // TS 2.8 Changelog
type _1 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"

type Texts =
  | "beer"
  | "programming"
  | "dinosaur"
  | "Donald Trump"
  | "ice cream"
  | "jQuery";

type BadTexts = "Donald Trump" | "jQuery" | "taxes";

type GoodTexts = Exclude<Texts, BadTexts>; // "beer" | "programming" | "dinosaur" | "ice cream"

// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// }

type Player = {
  name: string;
  email?: string;
  experience: number;
};

type User = Pick<Player, "name" | "email">; // { name: string, email?: string }
```

# Useful links

# type vs interface (tldr doesn't matter much)

Type enthusiast: https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c
Interface enthusiast: https://github.com/piotrwitek/react-redux-typescript-guide#living-style-guide
I guess I'm using type more often, but I think my code deserves to use both.
Whenever I feel type alias is right, I'll go with `type` alias,
when I want to create new type name and hide some details, I'll choose
`interface`.
I mix this a lot in this project, because I'd like to provoke questions.
