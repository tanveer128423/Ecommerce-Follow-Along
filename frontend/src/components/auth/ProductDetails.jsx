import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [otherProducts, setOtherProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // ✅ Quantity state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8000/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProduct(response.data);
            } catch (error) {
                console.error("❌ Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchOtherProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/products");
                const filteredProducts = response.data
                    .filter((p) => p._id !== id)
                    .slice(0, 5);
                setOtherProducts(filteredProducts);
            } catch (error) {
                console.error("❌ Error fetching other products:", error);
            }
        };

        if (id) {
            fetchProductDetails();
            fetchOtherProducts();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product && quantity > 0) {
            console.log(`✅ Added to cart: ${quantity} x ${product.name}`);
            // Optionally send request to add to cart with quantity
        }
    };

    const handleBuyNow = () => {
        if (product && quantity > 0) {
            console.log(`✅ Buying ${quantity} x ${product.name}`);
            // Optionally send request to handle purchase with quantity
        }
    };

    if (loading) return <p className="text-center text-white">Loading...</p>;

    if (!product) {
        return <p className="text-center text-red-500">Product not found</p>;
    }

    return (
        <div className="min-h-screen w-full bg-gray-800 text-white">
            <Navbar hideButtons={true} />

            {/* Product Details Section */}
            <div className="max-w-6xl mx-auto pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Image */}
                    <div className="w-full h-[400px] flex justify-center items-center rounded-lg">
                        {product.images?.length > 0 ? (
                            <img
                                src={`http://localhost:8000/uploads/${product.images[0]}`}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <p className="text-gray-400">No image available</p>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                            <p className="text-2xl text-green-400 font-semibold mb-4">
                                ${product.price}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-400"}>
                                        ★
                                    </span>
                                ))}
                                <span className="text-gray-400 ml-2">({product.rating || 0})</span>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-6">
                                {product.description || "No description available."}
                            </p>

                            {/* ✅ Quantity Input */}
                            <div className="flex items-center bg-gray-600 p-2 pl-3 rounded-[10px] w-50 gap-4 mb-4">
                                <label className="text-[1.3rem] font-semibold ">Quantity:</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                    min="1"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white text-2xl py-3 rounded-md transition-all focus:outline-none shadow-lg"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-green-500 cursor-pointer hover:bg-green-600 text-white text-2xl py-3 rounded-md transition-all focus:outline-none shadow-lg"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Products Section */}
            {otherProducts.length > 0 && (
                <div className="max-w-6xl mx-auto mt-12 p-6">
                    <h2 className="text-3xl font-bold mb-6">Other Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {otherProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-gray-700 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <div className="w-full h-[160px] flex justify-center items-center bg-gray-900 rounded-lg">
                                    {product.images?.[0] ? (
                                        <img
                                            src={`http://localhost:8000/uploads/${product.images[0]}`}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <p className="text-gray-400">No image</p>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                                <p className="text-green-400 mt-1">${product.price}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-400"}>
                                            ★
                                        </span>
                                    ))}
                                    <span className="text-gray-400 ml-2">({product.rating || 0})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
