import React from "react"

const Stdout = (props) => {
  const { stdout } = props

  return (
    <div className="border border-black p-10 bg-violet-100 text-left">
      <pre>{stdout}</pre>
    </div>
  )
}

export default Stdout
