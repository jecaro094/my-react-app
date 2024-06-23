// global.d.ts
import * as React from 'react'
import * as ReactDOM from 'react-dom'

declare global {
  interface Window {
    React: typeof React
    ReactDOM: typeof ReactDOM
  }
}
