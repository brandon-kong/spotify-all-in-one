import * as React from "react"
import "../../styles/css/global.css"
import Layout from "../../components/layout"
import { handleRedirect } from "../../components/Authenticate"

const Playlists = () => {
  return (
    <Layout>
      <h1>Playlists section</h1>
    </Layout>
  )
}

export default Playlists

export const Head = function() {
  return (
    <title>Playlists</title>
  )
}
