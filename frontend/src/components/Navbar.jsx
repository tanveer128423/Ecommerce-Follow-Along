import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar({ hideButtons = false }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  function capitalize(name) {
    if (typeof name !== 'string') {
      return '';
    }
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  

  return (
    <nav className="h-16 fixed top-0 left-0 right-0 z-10 w-full bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center">
          <h1
            onClick={() => navigate('/')}
            className="text-3xl font-bold cursor-pointer tracking-wide"
          >
            The Super Car Store
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <button onClick={() => navigate('/')} className=" text-2xl font-semibold hover:text-yellow-300 transition">
            Home
          </button>

          {/* Add Product Button (conditionally hidden) */}
          {!hideButtons && (
            <button onClick={() => navigate('/products')} className="text-2xl font-semibold hover:text-yellow-300 transition">
              Add Product
            </button>
          )}

          {user ? (
            <>
              <span className="text-2xl font-semibold">
                Welcome, <span className="font-semibold text-blue-300">{capitalize(user.name)}</span>
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>

              {/* Cart Button AFTER Logout */}
              {!hideButtons && (
                <button onClick={() => navigate('/cart')}>
                  <img
                    width="40"
                    height="40"
                    className="invert cursor-pointer"
                    src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png"
                    alt="shopping-basket-add"
                  />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/signup')}
                className="bg-blue-600  font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Signup
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 absolute top-16 left-0 w-full py-4 shadow-lg">
          <div className="flex flex-col space-y-4 items-center">
            <button onClick={() => navigate('/')} className="hover:text-yellow-300 transition">
              Home
            </button>

            {!hideButtons && (
              <button onClick={() => navigate('/add-product')} className="hover:text-yellow-300 transition">
                Add Product
              </button>
            )}

            {user ? (
              <>
                <span className="text-lg">
                  Welcome, <span className="text-yellow-300">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>

                {/* Cart Button AFTER Logout */}
                {!hideButtons && (
                  <button onClick={() => navigate('/cart')} className="hover:text-yellow-300 transition">
                    Cart
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Signup
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;