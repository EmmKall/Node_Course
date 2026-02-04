import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  img: {
    type: [String],
    default: [],
    required: false,
  },
  price: {
    type: Number,
    default: 0,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete (ret as any)._id
  }
});


export const ProductModel = mongoose.model("Product", productSchema);
