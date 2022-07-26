import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import InfoSettings from './pages/InfoSettings'
import Record from './pages/Record'
import Inspection from './pages/Inspection'
import PatternTrigger from './pages/PatternTrigger'
import Layout from './layout/index'
import './App.css'
import { useSelector } from 'react-redux'
import { RootStore } from './store/modules/reducer'

function App() {
  const navigate = useNavigate()
  const user = useSelector((state: RootStore) => state.user.user)

  function checkerogin() {
    if (user.name === '') {
      navigate('/login')
    }
  }

  useEffect(() => {
    checkerogin()
  }, [])

  return (
    <div className="bg-b-c wrapper">
      <Routes>
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
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
        <Route
          path="/patternTrigger"
          element={
            <Layout>
              <PatternTrigger />
            </Layout>
          }
        />
      </Routes>
    </div>
  )
}

export default App
