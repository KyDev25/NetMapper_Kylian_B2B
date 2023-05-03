import mongoose from "mongoose"
import config from "@/db/config"
import StdoutModel from "@/db/model/StdoutModel"

const getAllStdouts = async (req, res) => {
  await mongoose.connect(config.db.uri)
  
  try {
    const stdout = await StdoutModel.find()
    res.status(200).json(stdout)
  } finally {
    await mongoose.disconnect()
  }
}

export default getAllStdouts
