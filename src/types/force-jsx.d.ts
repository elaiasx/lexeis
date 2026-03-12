declare global {
  namespace JSX {
    interface IntrinsicElements {
      // common HTML elements used in the project
      div: any
      p: any
      span: any
      form: any
      input: any
      textarea: any
      button: any
      label: any
      select: any
      option: any
      nav: any
      main: any
      footer: any
      header: any
      section: any
      ul: any
      li: any
      a: any
      h1: any
      h2: any
      h3: any
      h4: any
      br: any
      img: any
      svg: any
      // fallback for any other tags
      [elemName: string]: any
    }
  }
}

export {}
