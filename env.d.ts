/// <reference types="vite/client" />
/// <reference types="unplugin-vue-macros/macros-global" />

declare const LATEST_COMMIT_HASH: string

declare global {
  interface Window {
    isMoved: boolean
    isMuted: boolean
    showMutedNotice: boolean
  }

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
