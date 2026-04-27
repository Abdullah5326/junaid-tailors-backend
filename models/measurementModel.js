import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema(
  {
    serialNo: {
      type: Number,
      default: null,
    },

    contactNo: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      default: null,
      required: [true, "The name of the client is required"],
    },
    lambai: {
      type: Number,
      required: [true, "Lambai is required"],
    },

    bazu: {
      type: Number,
      required: [true, "Bazu is required"],
    },

    tera: {
      type: Number,
      required: [true, "Tera is required"],
    },

    gala: {
      type: Number,
      required: [true, "Gala is required"],
    },

    chati: {
      type: Number,
      required: [true, "Chati is required"],
    },

    pancha: {
      type: Number,
      required: [true, "Pancha is required"],
    },

    shalwar: {
      type: Number,
      required: [true, "Shalwar is required"],
    },

    cuff: {
      type: Number,
    },

    pattiChorai: {
      type: Number,
      required: [true, "Patti Chorai is required"],
    },

    banChorai: {
      type: Number,
      required: [true, "Ban Chorai is required"],
    },

    sidePockets: {
      type: Number,
      required: [true, "Side Pockets is required"],
    },

    kamar: {
      type: Number,
      required: [true, "Kamar is required"],
    },

    gaira: {
      type: Number,
      required: [true, "Gaira is required"],
    },

    beltPlace: {
      type: Number,
      required: [true, "Belt Place is required"],
    },

    heap: {
      type: Number,
      required: [true, "Heap is required"],
    },
    golBazo: {
      type: Number,
      default: 0,
    },

    collar: {
      type: Boolean,
      default: null,
    },

    frontPocket: {
      type: Boolean,
      default: false,
    },

    chamakTar: {
      type: Boolean,
      default: false,
    },

    btnKimati: {
      type: Boolean,
      default: false,
    },

    chakPatiKaj: {
      type: Boolean,
      default: false,
    },

    golDaman: {
      type: Boolean,
      default: false,
    },

    shalwarPocket: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  },
);

const Measurement = mongoose.model("Measurement", measurementSchema);

export default Measurement;
