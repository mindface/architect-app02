import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "antd/dist/antd.css"
import "./index.css"

import { Provider } from "react-redux"
import { setupStore } from "./store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={setupStore}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
)
