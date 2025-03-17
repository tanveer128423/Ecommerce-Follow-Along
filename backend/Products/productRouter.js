const express = require("express");
const router = express.Router();
const Product = require("./productSchema");
const authenticate = require("../middleware/auth");
const upload = require("../multer");

// ➡️ Create Product Route
router.post("/add", authenticate, upload.array("images", 5), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized! User not authenticated." });
        }

        const { name, price, description, rating } = req.body;
        const userId = req.user._id;

        if (!name || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const imagePaths = req.files.map(file => file.filename);

        const product = new Product({
            name,
            price,
            description,
            rating: rating || 0, // ✅ Set default rating if not provided
            images: imagePaths,
            userId
        });

        await product.save();
        res.status(201).json({ message: "✅ Product added successfully!", product });
    } catch (error) {
        console.error("❌ Error adding product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ➡️ Get All Products Route
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

// ➡️ Get Single Product by ID Route
router.get("/:id", authenticate, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`❌ Error fetching product with ID ${req.params.id}:`, error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
});

// ➡️ Update Product Route
router.put("/:id", authenticate, upload.array("images", 5), async (req, res) => {
    const { id } = req.params;
    const { name, price, description, rating } = req.body;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this product" });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.rating = rating !== undefined ? rating : product.rating; // ✅ Update rating

        // ✅ Handle new image upload (if available)
        if (req.files.length > 0) {
            product.images = req.files.map(file => file.filename);
        }

        await product.save();

        res.status(200).json({ message: "✅ Product updated successfully", product });
    } catch (error) {
        console.error("❌ Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
});

// ➡️ Delete Product Route
router.delete("/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this product" });
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "✅ Product deleted successfully" });
    } catch (error) {
        console.error(`❌ Error deleting product with ID ${id}:`, error);
        res.status(500).json({ message: "Failed to delete product" });
    }
});

module.exports = router;
