import React from "react"
import HistoryStdouts from "./components/HistoryStdouts"
import Links from "./components/Links"

const history = () => {
  return (
    <div>
      <Links link="history" />
      <HistoryStdouts />
    </div>
  )
}

export default history
