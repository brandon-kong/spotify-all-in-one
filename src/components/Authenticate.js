import {React, useState, useEffect} from 'react'

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const CLIENT_ID = "760d1412462c461fb9ef3fc7ca5688d2"
const CLIENT_SECRET = "b9e51f7435c946858e43696e33c108b6"
const REDIRECT_URI = "http://localhost:8000/"

export const isValidated = () => {
    //function that checks if the client is authorized

    return localStorage.getItem('access_token') !== null
}

export const authorizeUser = () =>{
    //function that authorizes the client, redirecting them to the spotify permissions agreement page

    const url = getAuthorizeUrl();
    window.location.href = url
}

export const getAuthorizeUrl = () =>{
    //function that returns the URL to authorize the client

    return AUTHORIZE + "?client_id=" + CLIENT_ID + "&response_type=code" + "&redirect_uri=" + encodeURI(REDIRECT_URI) + "&show_dialog=true" + "&scope=user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private"
}

export const getTokenFromRedirectUrl = () => {

}