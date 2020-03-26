import ReactDOM from 'react-dom'
import React, { Suspense, useEffect, useRef, useState, Fragment } from 'react'
import { BrowserRouter as Router, NavLink as Link, Route } from 'react-router-dom';

import './index.css'
import LogoScene from './LogoScene.js'
import About from './About.js'

function App() {
  const activePageIndex = useRef(0);

  return (
    <Router>
      <Fragment>
        <nav className="clear" role="navigation">
          <div className="nav-wrapper container">
            <ul className="left">
              <li><Link
                to='/' exact={true} style={{ color: 'teal' }}
                activeStyle={{ fontWeight: "bold", color: 'white' }}>Home</Link></li>
              <li><Link to='/about' style={{ color: 'teal' }}
                activeStyle={{ fontWeight: "bold", color: 'white' }}>About</Link></li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact={true} component={LogoScene} />
        <Route path="/about" component={About} />
      </Fragment>
    </Router>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))
