import React, { Suspense, useEffect, useRef, useState, Fragment } from 'react'
import ReactDOM from 'react-dom'

export default function About() {
    return (
        <div className='about-tab'>
        <p className="card-content">
            This is a demo for displaying an interactable 3D experience.
            <br/>
            <br/>
            <a href="https://sketchfab.com/3d-models/novartis-brandmark-7f62a99f8ae94928a3aab63000e2352c">
                3D model by digitallysavvy
            </a>
        </p>
        </div>
    )
}