import * as React from "react"
import "../styles/css/global.css"
import Layout from "../components/layout"
import { handleRedirect } from "../components/Authenticate"

const IndexPage = () => {
  
  handleRedirect();
  return (
    <Layout>
      <h1>bye</h1>
    </Layout>
  )
}

export default IndexPage

export const Head = function() {
  return (
    <title>My Site</title>
  )
}
