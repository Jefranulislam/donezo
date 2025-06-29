import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: false, message: "Invalid ID format" });
  }
  next();
};

export default validateObjectId;