import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import BaseApp from "./components/base"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <React.StrictMode>
    <BaseApp />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()