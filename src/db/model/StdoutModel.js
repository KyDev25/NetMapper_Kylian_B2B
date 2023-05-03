import mongoose from "mongoose"
import StdoutSchema from "../schema/StdoutSchema"

const StdoutModel = mongoose.modelNames().includes("Stdout")
  ? mongoose.model("Stdout")
  : mongoose.model("Stdout", StdoutSchema)

export default StdoutModel
