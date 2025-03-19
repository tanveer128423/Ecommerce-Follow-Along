import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar({ hideButtons = false }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const capitalize = (name) =>
    typeof name === 'string' && name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : 'Guest';

  return (
    <nav className="h-16 fixed top-0 left-0 right-0 z-50 bg-red-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <h1
          onClick={() => navigate('/')}
          className="text-3xl font-bold cursor-pointer tracking-wide"
        >
          The Super Car Store
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="text-lg font-semibold cursor-pointer transition"
          >
            Home
          </button>

          {!hideButtons && (
            <button
              onClick={() => navigate('/products')}
              className="text-lg cursor-pointer font-semibold transition"
            >
              Add Product
            </button>
          )}

          <div className="text-lg font-medium text-gray-300">
            Welcome{' '}
            <span className="text-white-300">
              {user ? capitalize(user.name) : 'Guest'}
            </span>
          </div>

          {/* Cart Button */}
          {!hideButtons && user && (
            <button onClick={() => navigate('/cart')}>
              <img
                width="32"
                height="32"
                className="invert cursor-pointer hover:opacity-75 transition"
                src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3243378/shopping-cart-solid-icon-md.png"
                alt="shopping-cart"
              />
            </button>
          )}

          {/* User Dropdown */}
          <div className="relative">
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/user--v1.png"
              alt="user"
              className={`w-10 h-10 ${
                user ? 'bg-green-500' : 'bg-gray-400'
              } rounded-full p-1 cursor-pointer hover:opacity-75 transition`}
              onClick={toggleDropdown}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-blue-800 border border-blue-700 rounded-md shadow-lg z-20">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate('/profile')}
                      className="block w-full px-4 py-2 text-left text-blue-300 hover:bg-gray-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-yellow-400 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/signup')}
                      className="block w-full px-4 py-2 text-left text-blue-300 hover:bg-gray-700"
                    >
                      Signup
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className="block w-full px-4 py-2 text-left text-blue-300 hover:bg-gray-700"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 absolute top-16 left-0 w-full py-4 shadow-lg z-40">
          <div className="flex flex-col space-y-4 items-center">
            <button
              onClick={() => navigate('/')}
              className="text-lg font-semibold text-white hover:text-red-300 transition"
            >
              Home
            </button>

            {!hideButtons && (
              <button
                onClick={() => navigate('/products')}
                className="text-lg font-semibold text-vlack hover:text-red-300 transition"
              >
                Add Product
              </button>
            )}

            {user ? (
              <>
                <div className="text-gray-300">
                  Welcome,{' '}
                  <span className="text-blue-300">
                    {capitalize(user.name)}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-lg font-semibold text-black hover:text-red-300 transition"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold text-yellow-400 hover:text-yellow-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-lg font-semibold text-black hover:text-red-300 transition"
                >
                  Signup
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="text-lg font-semibold text-black hover:text-red-300 transition"
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
