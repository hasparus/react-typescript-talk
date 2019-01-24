declare module "react-use" {
  export function useLocalStorage<T>(
    key: string,
    initialValue: T
  ): [T, React.Dispatch<React.SetStateAction<T>>];
}

declare module "*.jpg" {
  const src: string;
  export default src;
}
