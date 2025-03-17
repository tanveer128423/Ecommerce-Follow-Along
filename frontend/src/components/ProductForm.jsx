import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProductForm = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "", // ✅ Added description
        images: [],
        imagePreviews: [],
    });

    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));

        setProductData({
            ...productData,
            images: files,
            imagePreviews,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("description", productData.description); // ✅ Added description
        productData.images.forEach((image) => formData.append("images", image));

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to add a product.");
                return;
            }

            await axios.post("http://localhost:8000/products/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <Navbar hideButtons={true} />
            <div className="p-6 max-w-lg mx-auto bg-gray-200 shadow-xl rounded-lg">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Add New Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Name */}
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                    />

                    {/* Price */}
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        placeholder="Price ($)"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                    />

                    {/* ➕ Description */}
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        placeholder="Product Description"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                    ></textarea>

                    {/* Image Upload */}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
