import {React, useState, useEffect} from 'react'
import axios, * as Axios from 'axios';

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

const CLIENT_ID = "760d1412462c461fb9ef3fc7ca5688d2";
const CLIENT_SECRET = "b9e51f7435c946858e43696e33c108b6";
const REDIRECT_URI = "http://localhost:8000/";


export const isValidated = () => {
    //function that checks if the client is authorized

    return localStorage.getItem('access_token') !== null
}

export const authorizeUser = () =>{
    //function that authorizes the client, redirecting them to the spotify permissions agreement page

    if (isValidated() == false){
        const url = getAuthorizeUrl();
        window.location.href = url
    }
    else {
        alert("You are already authorized");
    }
}

export const getAuthorizeUrl = () =>{
    //function that returns the URL to authorize the client

    return AUTHORIZE + "?client_id=" + CLIENT_ID + "&response_type=code" + "&redirect_uri=" + encodeURI(REDIRECT_URI) + "&show_dialog=true" + "&scope=user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private"
}

export const getAccessToken = (code) => {
    let header = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=authorization_code&code=' + code + '&redirect_uri=' + encodeURI(REDIRECT_URI) + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch(TOKEN, header)
        .then(response => response.json())
        .then(data => {
            window.history.pushState({}, document.title, "/" + window.location.pathname.split("/")[1]);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            window.location.reload();
        })


}

export const getCode = () => {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    return code;
}


export const handleRedirect = () => {
    //function that handles the redirect from the spotify permissions agreement page

    const code = getCode();
    if (code) {
        getAccessToken(code);
    }
}