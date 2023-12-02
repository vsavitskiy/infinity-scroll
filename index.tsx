import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/app'

const rootNode = document.getElementById('root')

if (rootNode == null) {
  throw new Error('Root node not found')
}

const root = ReactDOM.createRoot(rootNode)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
