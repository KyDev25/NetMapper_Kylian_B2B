import mongoose from "mongoose"

const StdoutSchema = mongoose.Schema(
  {
    scanningOption: { type: String, required: true },
    otherOption: { type: String, required: false },
    argument: { type: String, required: true },
    stdout: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default StdoutSchema
