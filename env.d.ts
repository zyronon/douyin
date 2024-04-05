/// <reference types="vite/client" />

declare global {
  interface Navigator {
    control: any
    webkitGetUserMedia: any
    mozGetUserMedia: any
    getUserMedia: any
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

export {}
