import mongoose from "mongoose";
import { POST_STATUS, values } from "../../config/constants.js";
import { clientJson } from "../../core/clientJson.js";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    category: { type: String, default: "Update" },
    author: { type: String, default: "Nalvalam Foundation" },
    status: { type: String, enum: values(POST_STATUS), default: POST_STATUS.DRAFT },
    publishedAt: { type: Date, default: null },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

postSchema.plugin(clientJson);
postSchema.index({ status: 1, publishedAt: 1 });

// The collection is still called "blogs", the name the data was created under.
export const Post = mongoose.model("Blog", postSchema);
