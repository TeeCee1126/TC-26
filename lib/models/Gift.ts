import mongoose, { Schema, Model } from "mongoose";

export type GiftDocument = {
  type: "physical" | "cash" | "custom";

  name: string;
  phone: string;
  anonymous: boolean;

  giftTiming:
    | "Before the wedding"
    | "On the wedding day"
    | "After the wedding";

  itemId?: number;
  itemName?: string;

  amount?: string;

  description?: string;

  status:
    | "pending"
    | "received"
    | "completed"
    | "cancelled";

  createdAt: Date;
};

const GiftSchema = new Schema<GiftDocument>(
  {
    type: {
      type: String,
      enum: ["physical", "cash", "custom"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    anonymous: {
      type: Boolean,
      default: false,
    },

    giftTiming: {
      type: String,
      enum: [
        "Before the wedding",
        "On the wedding day",
        "After the wedding",
      ],
      required: true,
    },

    itemId: {
      type: Number,
    },

    itemName: {
      type: String,
      trim: true,
    },

    amount: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "received",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const Gift: Model<GiftDocument> =
  mongoose.models.Gift ||
  mongoose.model<GiftDocument>("Gift", GiftSchema);

export default Gift;