import { Schema, model } from "mongoose";

//Schema for Mongoose(BD)
const OpportunitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  won_time: {
    type: Date,
    required: true,
  },
});

export default model("opportunities", OpportunitySchema);
