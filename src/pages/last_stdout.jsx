import React from "react"
import OneStdout from "./components/OneStdout"
import Links from "./components/Links"

const last_stdout = () => {
  return (
    <div>
      <Links link="last"/>
      <OneStdout />
    </div>
  )
}

export default last_stdout
