import { useState, useEffect } from "react"
import React from 'react'
import { createGlobalStyle } from "styled-components"
import Navbar from "./Navbar"

import { handleRedirect, isValidated } from "./Authenticate"

const GlobalStyle = createGlobalStyle`
    :root {
        --color-primary: #191414;
        --color-secondary: #1DB954;
        --color-secondary-dark: #1aad4e;
        --header-font-size: 4rem;
        --body-font-size: 1.3rem;
        box-sizing: border-box;
    }

    body {
        background-color: var(--color-primary);
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        color: #333;
        margin: 0;
        padding: 0;
        font-family: 'Gotham', serif;
        color: var(--color-secondary);
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
    }

    
`

export default function Layout({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const hasAuthToken = isValidated();
        if (hasAuthToken == true) {
            setIsAuthenticated(true);
    }}, [isAuthenticated]);

    
  return (
    <React.Fragment>
        <GlobalStyle />
        <Navbar auth={isAuthenticated}/>
        {children}
    </React.Fragment>
  )
}   