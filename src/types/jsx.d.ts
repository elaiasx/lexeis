import * as React from 'react'

declare global {
  namespace JSX {
    // Re-export React's IntrinsicElements so the editor recognizes standard HTML tags
    // This avoids "Property 'div' does not exist on type 'JSX.IntrinsicElements'" diagnostics
    interface IntrinsicElements extends React.JSX.IntrinsicElements {
      // Fallback: allow unknown intrinsic elements to prevent excessive editor errors
      [elemName: string]: any
    }
  }
}

export {}
