import axios from "axios"
import React, { useEffect, useState } from "react"
import Stdout from "./Stdout"

const OneStdout = () => {
  const [stdouts, setStdouts] = useState([])
  const [detail, setDetail] = useState(false)

  useEffect(() => {
    axios.get("/api/getLastStdout").then((res) => setStdouts(res.data))
  }, [])

  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("en-En", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
  }

  return (
    <div className="mx-auto p-7 text-center rounded-md border border-gray-300 bg-gradient-to-br from-white to-gray-200 max-w-3xl min-h-[300px] relative overflow-hidden shadow-md mt-10">
      {stdouts.map((response, id) => (
        <div key={id}>
          <Stdout stdout={response.stdout} id={response._id} />
          {!detail ? (
            <button
              className="bg-blue-700 hover:bg-blue-500 active:bg-blue-800 text-white py-2 px-6 rounded-full mb-5 mt-10 transition-colors duration-150"
              onClick={() => setDetail(true)}
            >
              Detail{" "}
            </button>
          ) : (
            <>
              <ul className="flex justify-center gap-2 pb-3 mt-10 flex-col px-32">
                <li className="bg-purple-500 text-white py-3 rounded-md shadow-md mb-3">
                  Argument : {response.argument}
                </li>
                <li className="bg-purple-500 text-white rounded-md shadow-md mb-3 py-3">
                  Scanning Option : {response.scanningOption}
                </li>
                {response.otherOption.length >= 2 ? (
                  <li className="bg-purple-500 text-white py-3 rounded-md shadow-md mb-3">
                    Other Option : {response.otherOption}
                  </li>
                ) : (
                  <></>
                )}
                <li className="bg-purple-500 text-white py-3 rounded-md shadow-md mb-3">
                  Date : {dateFormater(response.createdAt)}
                </li>
              </ul>
              <button
                onClick={() => setDetail(false)}
                className="bg-blue-700 hover:bg-blue-500 active:bg-blue-800 text-white py-2 px-6 rounded-full mb-5 mt-10 transition-colors duration-150"
              >
                Cancelled
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default OneStdout
