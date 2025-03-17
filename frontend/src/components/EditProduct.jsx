import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        rating: 0,
        images: [],
    });

    const [previewImage, setPreviewImage] = useState(null);

    // Fetch existing product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8000/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProduct(response.data);
                if (response.data.images?.length > 0) {
                    setPreviewImage(`http://localhost:8000/uploads/${response.data.images[0]}`);
                }
            } catch (error) {
                console.error("❌ Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle rating change
    const handleRatingChange = (value) => {
        setProduct((prev) => ({
            ...prev,
            rating: value,
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct((prev) => ({
                ...prev,
                images: [file],
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("description", product.description);
            formData.append("rating", product.rating);

            if (product.images.length > 0) {
                formData.append("images", product.images[0]);
            }

            await axios.put(`http://localhost:8000/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("✅ Product updated successfully!");
            navigate(`/product/${id}`);
        } catch (error) {
            console.error("❌ Error updating product:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
            <div className="p-8 bg-gray-700 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-6">Edit Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Product Image Preview */}
                    <div className="w-full h-[200px] flex justify-center items-center bg-gray-900 rounded-lg">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <p className="text-gray-400">No image available</p>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 border rounded bg-gray-700 text-gray-300"
                    />

                    {/* Product Name */}
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="p-2 border rounded bg-gray-700 text-gray-300"
                        required
                    />

                    {/* Product Price */}
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="p-2 border rounded bg-gray-700 text-gray-300"
                        required
                    />

                    {/* Product Rating */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Rating:</span>
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                onClick={() => handleRatingChange(i + 1)}
                                className={i < product.rating ? "text-yellow-400 cursor-pointer" : "text-gray-400 cursor-pointer"}
                            >
                                ★
                            </span>
                        ))}
                        <span className="text-gray-400 ml-2">({product.rating || 0})</span>
                    </div>

                    {/* Product Description */}
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="p-2 border rounded bg-gray-700 text-gray-300"
                    />

                    {/* Action Buttons */}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
                    >
                        Update Product
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/product/${id}`)}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
