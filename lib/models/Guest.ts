import mongoose, { Schema, Model } from "mongoose";

export type GuestDocument = {
  name: string;
  phone: string;
  numberAttending: number;
  accessCode: string;
  createdAt: Date;
};

const GuestSchema = new Schema<GuestDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    numberAttending: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    accessCode: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const Guest: Model<GuestDocument> =
  mongoose.models.Guest ||
  mongoose.model<GuestDocument>("Guest", GuestSchema);

export default Guest;