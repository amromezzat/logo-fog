import ReactDOM from 'react-dom'
import React, { Suspense, useEffect, useRef, useState } from 'react'

import './index.css'
import LogoScene from './LogoScene.js'


function App() {
  return (
    <LogoScene />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
