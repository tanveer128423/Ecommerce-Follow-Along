const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 }, // ✅ Added rating field
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true // ✅ Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Product", ProductSchema);
