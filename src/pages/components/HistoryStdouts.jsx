import axios from "axios"
import React, { useEffect, useState } from "react"
import Stdout from "./Stdout"
import Link from "next/link"
import config from "@/db/config"

const HistoryStdouts = () => {
  const [stdouts, setStdouts] = useState([])

  useEffect(() => {
    axios.get("/api/getAllStdouts").then(async (res) => {
      await setStdouts(res.data)
    })
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
    <>
      {stdouts.map((response, id) => (
        <div
          key={id}
          className="mx-auto p-7 rounded-md border border-gray-300 bg-gradient-to-br from-white to-gray-200 max-w-3xl min-h-[300px] relative overflow-hidden shadow-md mt-20"
        >
          <Stdout stdout={response.stdout} id={response._id} key={id} />
          <ul className="flex justify-center gap-2 pb-3 mt-10 flex-col px-32 text-center">
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
          <div className="text-center mt-5">
            <Link
              href={`${config.api.baseUrl}deleteStdout/${response._id}`}
              className="bg-blue-700 hover:bg-blue-500 active:bg-blue-800 text-white py-2 px-6 rounded-full transition-colors duration-150"
            >
              Delete
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

export default HistoryStdouts
