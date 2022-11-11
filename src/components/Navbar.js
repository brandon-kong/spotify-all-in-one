import React from 'react'
import { useState, useEffect } from 'react'

import styled from 'styled-components'
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { FaSpotify } from 'react-icons/fa'

import axios from 'axios'
import qs from 'qs'


const Container = styled.div`
    display: flex;
    min-height: 75px;
    padding-top: .8rem;
    padding-bottom: .8rem;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 768px) {
        justify-content: center;
    }
`

const LogoSub = styled.h3`
    margin-right: .8rem;
    font-family: 'Gotham Light', serif;
    font-size: max(1.4vw, 1.2rem);
    color: #fff;
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

    @media (max-width: 768px) {
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

const getAuth = async () => {
    const CLIENT_ID = "760d1412462c461fb9ef3fc7ca5688d2"
    const CLIENT_SECRET = "b9e51f7435c946858e43696e33c108b6"

    const auth_token = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const token_url = 'https://accounts.spotify.com/api/token';

    try{
      //make post request to SPOTIFY API for access token, sending relavent info
      const data = qs.stringify({'grant_type':'client_credentials'});
  
      const response = await axios.post(token_url, data, {
        headers: { 
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded' 
        }
      })
      //return access token
      return response.data.access_token;
      //console.log(response.data.access_token);   
    }catch(error){
      //on fail, log the error in console
      console.log(error);
      return null;
    }
  }

export default function Navbar() {

    const token = getAuth()
    console.log(token)
    const isAuthenticated = token != null

    return (
        <Container>
            <Logo>
                <LogoSub>all in one for</LogoSub>
                <a href="https://www.spotify.com/us/">
                    <StaticImage 
                        className="unselectable"
                        src="../images/SpotifyLogoGreen.png" 
                        alt="Spotify logo"
                        height={70}
                    />
                </a>
            </Logo>
            <NavList>
                <NavItem to="/">home</NavItem>
                <NavItem to="/">stats</NavItem>
                <NavItem to={isAuthenticated ? "/playlists" : "/"}>playlists</NavItem>
                <SocialIcon href="https://open.spotify.com/user/0wy58v4k1seh4grvacxy5qp0j?si=7ae034bf712b43c2"><SpotifyIcon/></SocialIcon>
            </NavList>
        </Container>
    )
}