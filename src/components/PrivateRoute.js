import React from "react"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const isLoggedIn = false
  if (isLoggedIn == false) {
    console.log("sadfjsadfjsl;fj")
    navigate("https://www.google.com")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute