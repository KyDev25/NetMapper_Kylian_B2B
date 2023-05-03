import Link from "next/link"
import React from "react"

const Links = (props) => {
  const { link } = props

  return (
    <div className="flex justify-around text-6xl bg-gray-900 p-10">
      {link == "home" ? (
        <>
          <Link
            href="/"
            className="place-items-center text-purple-400 hover:text-purple-800"
          >
            Home
          </Link>
          <Link
            href="/last_stdout"
            className="text-gray-200 hover:text-purple-800 transition-colors duration-300"
          >
            Last Stdout
          </Link>
          <Link
            href="/history"
            className="text-gray-200 hover:text-purple-800 transition-colors duration-300"
          >
            History
          </Link>
        </>
      ) : link == "last" ? (
        <>
          <Link
            href="/"
            className="place-items-center text-gray-200 hover:text-purple-800 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/last_stdout"
            className="text-purple-400 hover:text-purple-800"
          >
            Last Stdout
          </Link>
          <Link
            href="/history"
            className="text-gray-200 hover:text-purple-800 transition-colors duration-300"
          >
            History
          </Link>
        </>
      ) : link == "history" ? (
        <>
          <Link
            href="/"
            className="place-items-center text-gray-200 hover:text-purple-800 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/last_stdout"
            className="text-gray-200 hover:text-purple-800 transition-colors duration-300"
          >
            Last Stdout
          </Link>
          <Link
            href="/history"
            className="text-purple-400 hover:text-purple-800"
          >
            History
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Links
