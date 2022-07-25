import React from "react"
import { Card } from "antd"
import ContentLogin from "../components/ContentLogin"

function Login() {
  return (
    <div className="login pt-4">
      <Card style={{ maxWidth: 320, margin: "auto" }}>
        <ContentLogin />
      </Card>
    </div>
  )
}

export default Login
