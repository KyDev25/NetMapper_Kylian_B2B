import mongoose from "mongoose"
import config from "@/db/config"
import StdoutModel from "@/db/model/StdoutModel"

const deleteStdout = async (req, res) => {
  const { stdoutId } = req.query
  await mongoose.connect(config.db.uri)

  try {
    await StdoutModel.findByIdAndDelete(stdoutId)
  } finally {
    await mongoose.disconnect()
  }
  
  res.redirect("/history")
}

export default deleteStdout
