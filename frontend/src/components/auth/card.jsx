import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Ensure axios is installed for API calls

const Card = ({ id, name, price, image, onAddToCart, onBuyNow, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Adding quantity for Add to Cart functionality

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8000/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          onDelete(id); // Notify parent component of the deletion
          console.log("Product deleted successfully!");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("❌ Error deleting product:", error);
        console.log(error.message || "Failed to delete product. Please try again.");
      }
    }
  };

  const handleAddToCart = async () => {
    if (quantity > 0) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:8000/cart",
          {
            productId: id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Product added to cart!");
        navigate('/cart')
        console.log("Updated cart:", response.data); // Optional: Log the updated cart data
      } catch (error) {
        console.error("Error adding to cart:", error);
        console.log("Failed to add product to cart. Please try again.");
      }
    } else {
      console.log("Quantity must be greater than 0.");
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200 w-full max-w-sm">
      {/* Product Image */}
      <div className="relative w-full h-64 flex justify-center items-center bg-gray-700">
        <img
          src={image}
          alt={name}
          onClick={() => navigate(`/product/${id}`)}
          className="cursor-pointer object-contain h-full w-full p-4"
        />
        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:invert cursor-pointer transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
            <path d="M14.5 5.5L3 17 3 21 7 21 18.5 9.5zM21.2 2.8c-1.1-1.1-2.9-1.1-4 0L16 4l4 4 1.2-1.2C22.3 5.7 22.3 3.9 21.2 2.8z"></path>
          </svg>
        </button>
      </div>

      {/* Product Details */}
      <div className="text-center p-4">
        <h3 className="font-semibold text-gray-100 text-3xl">{name}</h3>
        <p className="text-2xl text-green-600 font-bold mt-1">${price}</p>


        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-4 pb-4">
          {/* Add to Cart */}
          <button onClick={handleAddToCart} className="flex items-center cursor-pointer justify-center">
            <img
              width="24"
              height="24"
              className="invert"
              src="https://img.icons8.com/material/24/shopping-cart--v1.png"
              alt="shopping-cart--v1"
            />
          </button>

          {/* Buy Now & Delete Button Container */}
          <div className="flex gap-3">
            {/* Buy Now */}
            <button
              onClick={onBuyNow}
              className="bg-green-500 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
            >
              Buy Now
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
