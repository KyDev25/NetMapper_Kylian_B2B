import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const NmapForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [validateRegex, setValidateRegex] = useState(false)
  const [validateScanningOption, setValidateScanningOption] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [validateAll, setValidateAll] = useState(false)
  const [validateOtherOption, setValidateOtherOption] = useState(false)
  const [point, setPoint] = useState("")
  const [scanningOption, setScanningOption] = useState("")
  const [otherOption, setOtherOption] = useState("")
  const [argument, setArgument] = useState("")
  const [validateValue, setValidateValue] = useState("")
  const scanningOptions = ["-sT", "-sU", "-sL", "-F"]
  const otherOptions = ["--traceroute", "--max-retries", "--host-timeout"]
  const router = useRouter()
  let numberPoint = 0
  const domainOrIpRegex =
    /^(?:(?:(?:[a-zA-z\\-]+)\\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})?$/

  useEffect(() => {
    setInterval(() => {
      if (submitted) {
        numberPoint++

        if (numberPoint <= 3) {
          setPoint(".".repeat(numberPoint))
        }

        if (numberPoint >= 4) {
          setPoint("")
          // eslint-disable-next-line react-hooks/exhaustive-deps
          numberPoint = 0
        }
      }
    }, 500)
  }, [submitted])

  useEffect(() => {
    if (scanningOptions.includes(scanningOption)) {
      setValidateScanningOption(true)

      return
    }

    setValidateScanningOption(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanningOption])

  const selectedScanningOption = (e) => {
    if (e == "default") {
      setScanningOption("")

      return
    }

    setScanningOption(e)
  }

  const selectedOtherOptions = (e) => {
    if (e == "default") {
      setOtherOption("")

      return
    }

    setOtherOption(e)
  }

  const handleForm = (e) => {
    e.preventDefault()
    axios
      .post("/api/postStdout", {
        scanningOption: scanningOption,
        otherOption: `${otherOption} ${validateValue}`,
        argument: argument,
      })
      .then(() => {
        router.push("/last_stdout")
      })
  }

  const checkAllValidates = (e) => {
    if ((validateRegex && validateScanningOption) || validateOtherOption) {
      handleForm(e)
      setSubmitted(true)
      setValidateAll(true)

      return
    }

    e.preventDefault()
    setSubmitted(false)
    setValidateAll(false)
  }

  return (
    <div className="max-w-lg mx-auto my-20 p-10 px-10 text-center rounded-md border border-gray-300 bg-gradient-to-br from-white to-gray-200 min-h-[260px] relative overflow-hidden shadow-md">
      <form className="flex flex-col p-6">
        <h1
          htmlFor="argument"
          className="block text-gray-700 text-3xl font-bold mb-10 text-center"
        >
          NET MAPPER
        </h1>
        <input
          type="text"
          name="argument"
          id="argument"
          placeholder="Domain or IP"
          className="border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => {
            if (e.target.value.match(domainOrIpRegex)) {
              setArgument(e.target.value)
              setValidateRegex(true)

              return
            }

            setValidateRegex(false)
          }}
        />
        {validateRegex && argument ? (
          <p className="text-green-700">Domain Name or IP Address Valid</p>
        ) : (
          <p className="text-red-700">Domain Name or IP Address Not Valid</p>
        )}
        <div>
          <select
            className="w-3/5 mx-auto mt-4 mb-2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="scanningOption"
            id="scanningOption"
            onChange={(e) => {
              selectedScanningOption(e.target.value)
            }}
          >
            <option value="default">Scanning Option</option>
            {scanningOptions.map((argument, key) => (
              <option value={argument} key={key} id={argument}>
                {argument}
              </option>
            ))}
          </select>
        </div>
        <div className="italic font-bold">
          {scanningOption == "-sT" ? (
            <>
              <p>TCP Port Scan</p>
            </>
          ) : scanningOption == "-sU" ? (
            <>
              <p>UDP Port Scan</p>
            </>
          ) : scanningOption == "-sL" ? (
            <>
              <p>Scan List</p>
            </>
          ) : scanningOption == "-F" ? (
            <>
              <p>Quick Scan</p>
            </>
          ) : (
            <></>
          )}
        </div>
        {validateScanningOption && scanningOption ? (
          <></>
        ) : (
          <p className="text-red-700">Scanning Option Mandatory</p>
        )}
        <div>
          <select
            className="w-3/5 mx-auto mt-4 mb-2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="otherOptions"
            id="otherOptions"
            onChange={(e) => {
              selectedOtherOptions(e.target.value)
            }}
          >
            <option value="default">Other Option</option>
            {otherOptions.map((argument, key) => (
              <option value={argument} key={key} id={argument}>
                {argument}
              </option>
            ))}
          </select>
        </div>
        <>
          {otherOption == "--traceroute" ? (
            <>
              <p className="italic font-bold">
                Trace the route between the machine to be scanned and the target
                host
              </p>
            </>
          ) : otherOption == "--max-retries" ? (
            <>
              <label
                htmlFor="retry"
                className="block text-gray-700 text-3xl font-bold mt-5 mb-10 text-center"
              >
                Max Retries
              </label>
              <input
                type="number"
                id="retry"
                placeholder="Max Retries"
                className="border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                  if (e.target.value) {
                    setValidateOtherOption(true)
                    setValidateValue(e.target.value)

                    return
                  }

                  setValidateOtherOption(false)
                }}
              />
              <p className="italic font-bold">
                Number of retransmissions of test packets
              </p>
              {validateOtherOption && validateValue ? (
                <></>
              ) : (
                <p className="text-red-700">Max Retries Mandatory</p>
              )}
            </>
          ) : otherOption == "--host-timeout" ? (
            <>
              <label
                htmlFor="timeout"
                className="block text-gray-700 text-3xl font-bold mt-5 mb-10 text-center"
              >
                Host Timeout
              </label>
              <input
                type="number"
                id="timeout"
                placeholder="Host Timeout (In Milliseconds)"
                className="border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                  if (e.target.value) {
                    setValidateOtherOption(true)
                    setValidateValue(e.target.value)

                    return
                  }

                  setValidateOtherOption(false)
                }}
              />
              <p className="italic font-bold">
                Abandonment of too slow target hosts
              </p>
              {validateOtherOption ? (
                <></>
              ) : (
                <p className="text-red-700">Host Timeout Mandatory</p>
              )}
            </>
          ) : (
            <></>
          )}
        </>
        <button
          type="submit"
          className=" bg-blue-700 hover:bg-blue-500 active:bg-blue-800 text-white py-2 px-6 rounded mb-5 mt-10 transition-colors duration-150"
          onClick={(e) => {
            checkAllValidates(e)
          }}
        >
          Launch Scan
        </button>
        {submitted ? (
          <p className="block text-gray-700 text-3xl font-bold mt-5 mb-10 text-center">{`Please Wait${point}`}</p>
        ) : (
          <></>
        )}
      </form>
    </div>
  )
}

export default NmapForm
