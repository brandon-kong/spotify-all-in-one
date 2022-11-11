import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/PrivateRoute"
import Playlists from "./playlists"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/playlists" component={Playlists} />
    </Router>
  </Layout>
)

export default App