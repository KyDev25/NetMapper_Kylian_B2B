import mongoose from "mongoose"
import config from "@/db/config"
import StdoutModel from "@/db/model/StdoutModel"

const getLastStdout = async (req, res) => {
  await mongoose.connect(config.db.uri)

  try {
    const stdout = await StdoutModel.find().sort({ _id: -1 }).limit(1)
    res.status(200).json(stdout)
  } finally {
    await mongoose.disconnect()
  }
}

export default getLastStdout
