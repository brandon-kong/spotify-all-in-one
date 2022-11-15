import React from 'react'
import { useState, useEffect } from 'react'

import styled from 'styled-components'
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { FaSpotify } from 'react-icons/fa'

import axios from 'axios'
import qs from 'qs'

import { isValidated, authorizeUser, getAuthorizeUrl, getTokenFromRedirectUrl, handleRedirect } from './Authenticate'

const RESPONSIVE_MAX_WIDTH = 900;

const Container = styled.div`
    display: flex;
    min-height: 75px;
    padding-top: .8rem;
    padding-bottom: .8rem;
    justify-content: space-around;
    align-items: center;

    @media (max-width: ${RESPONSIVE_MAX_WIDTH}px) {
        justify-content: center;
    }
`

const LogoSub = styled.h3`
    margin-right: .8rem;
    font-family: 'Gotham Light', serif;
    font-size: max(1.4vw, 1.2rem);
    color: #fff;
    letter-spacing: 1px;
`

const Logo = styled.div`
    display: flex;
    align-items: center;

    position: relative;
`


const NavList = styled.ul`
    display: flex;
    gap: 2rem;
    position: relative;
    align-items: center;

    @media (max-width: ${RESPONSIVE_MAX_WIDTH}px) {
        display: none;
    }
`

const NavItem = styled(Link)`
    text-decoration: none;
    color: #fff;
    font-family: 'Gotham Light', serif;
    font-size: 1.2rem;

    transition: all 0.3s ease-in-out;

    &:hover {
        color: var(--color-secondary);
    }
`

//this should have the same css as NavItem
const SocialIcon = styled.a`
    text-decoration: none;
    color: #fff;
    font-family: 'Gotham Light', serif;
    font-size: 1.2rem;

    transition: all 0.3s ease-in-out;

    &:hover {
        color: var(--color-secondary);
    }
`

const SpotifyIcon = styled(FaSpotify)`
    font-size: 1.5rem;
`

const AuthenticateButton = styled.a`
    text-decoration: none;
    color: color: var(--color-secondary-dark);
    font-family: 'Gotham Light', serif;
    font-size: 1.2rem;

    background: none;
    padding: .5rem 1.5rem;
    border-radius: 30px;

    -webkit-box-shadow:inset 0px 0px 0px 2px var(--color-secondary-dark);
    -moz-box-shadow:inset 0px 0px 0px 2px var(--color-secondary-dark);
    box-shadow:inset 0px 0px 0px 2px var(--color-secondary-dark);

    transition: all 0.1s ease-in-out;

    &:hover {
        color: #000;
        font-weight: 1000;
        background-color: var(--color-secondary-dark);
    }
`

export default function Navbar( { auth } ) {

    return (
        <Container onLoad={handleRedirect}>
            <Logo>
                <LogoSub>Dashboard for</LogoSub>
                <a href="https://www.spotify.com/us/">
                    <StaticImage 
                        className="unselectable"
                        src="../images/SpotifyLogoGreen.png" 
                        alt="Spotify logo"
                        height={70}
                    />
                </a>
            </Logo>
            {auth == true && 
            //if the user is authenticated, show the nav bar
            (
                <NavList>
                    <NavItem to="/">home</NavItem>
                    <NavItem to="/">stats</NavItem>
                    <NavItem to={auth ? "/playlists" : getAuthorizeUrl()}>playlists</NavItem>
                    <SocialIcon href="https://open.spotify.com/user/0wy58v4k1seh4grvacxy5qp0j?si=7ae034bf712b43c2"><SpotifyIcon/></SocialIcon>
                </NavList>
            )
             || 
             //if not authenticated, show login button
             (
                <NavList>
                    <NavItem to="/">Global Stats</NavItem>
                    <AuthenticateButton href={auth == false && getAuthorizeUrl() || ""}>Authenticate account</AuthenticateButton>
                </NavList>
             )}
        </Container>
    )
}