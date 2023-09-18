declare module '*.svg' {
  const content;
  export const ReactComponent;
  export default content;
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module '*.md' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
