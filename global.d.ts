// Global JSX fallback to avoid excessive TS2339 complaints in the editor
// This file intentionally provides a permissive fallback for IntrinsicElements.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

export {}
