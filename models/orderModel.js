import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    measurementSnapshot: {
      type: Object, // JSONB equivalent
      default: null,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      default: "pending",
    },

    tailorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "The tailor is required"],
    },

    cutterId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "The cutter is required"],
    },

    description: {
      type: String,
      default: null,
    },

    contactNo: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      required: [true, "The name of the client is required"],
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
