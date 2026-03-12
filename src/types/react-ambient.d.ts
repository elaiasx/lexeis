/// <reference types="react" />

// Ensure global JSX picks up React's JSX IntrinsicElements and add a permissive fallback.
declare global {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export {}
