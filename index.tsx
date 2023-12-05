/**
 * @fileOverview This is the entry point of the application.
 * It renders the <App /> component into the #root element.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/app'

import './index.css'

/**
 * @type {HTMLElement} rootNode - the root element of the application
 */
const rootNode = document.getElementById('root')

/**
 * @throws {Error} if the root element is not found
 */
if (rootNode == null) {
  throw new Error('Root node not found')
}

/**
 * @type {ReactDOM.Root} root - the root of the application
 */
const root = ReactDOM.createRoot(rootNode)

/**
 * Render the <App /> component into the root element
 */
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
