import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import InfoSettings from "./pages/InfoSettings"
import Record from "./pages/Record"
import Inspection from "./pages/Inspection"
import Layout from "./layout/index"
import "./App.css"

function App() {
  return (
    <div className="bg-b-c wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/infoSettings"
          element={
            <Layout>
              <InfoSettings />
            </Layout>
          }
        />
        <Route
          path="/record"
          element={
            <Layout>
              <Record />
            </Layout>
          }
        />
        <Route
          path="/inspection"
          element={
            <Layout>
              <Inspection />
            </Layout>
          }
        />
      </Routes>
    </div>
  )
}

export default App
