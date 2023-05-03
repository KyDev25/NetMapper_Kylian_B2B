import mongoose from "mongoose"
import config from "@/db/config"
import StdoutModel from "@/db/model/StdoutModel"
import { exec } from "child_process"

const postStdout = async (req, res) => {
  const { otherOption, scanningOption, argument } = req.body

  exec(
    `nmap ${scanningOption} ${otherOption} ${argument}`,
    async (error, stdout, stderr) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(`error: ${error.message}`)

        return
      }

      if (stderr) {
        // eslint-disable-next-line no-console
        console.error(`stderr: ${stderr}`)
      }

      const replaceStdout = stdout.replace(", Madrid (heure d��t�)", "")

      await mongoose.connect(config.db.uri)

      try {
        await StdoutModel.create({
          stdout: replaceStdout,
          scanningOption: scanningOption,
          otherOption: otherOption,
          argument: argument,
        })
      } finally {
        await mongoose.disconnect()
        res.redirect("/last_stdout")
      }
    }
  )
}

export default postStdout
