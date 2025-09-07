import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch, HiOutlineMenu, HiX } from 'react-icons/hi';
import Cart from '../components/Cart';
import logo from '../assets/images/technet-logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/features/user/userSlice';
import { useState, useRef, useEffect } from 'react';
import { useSearchProductsQuery } from '@/redux/features/products/productApi';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  features: string[];
  status: boolean;
  rating: number;
  comments: string[];
}

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading } = useSearchProductsQuery(
    searchTerm,
    {
      skip: !searchTerm || searchTerm.length < 2,
    }
  );

  const products: Product[] = searchResults?.data || [];

  // Close search popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show/hide search results based on search term
  useEffect(() => {
    if (searchTerm.length >= 2) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product-details/${productId}`);
    setSearchTerm('');
    setShowSearchResults(false);
    setMobileMenuOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const SearchPopup = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div
      className={`absolute ${
        isMobile ? 'top-full left-0 right-0' : 'top-full left-0'
      } 
        ${
          isMobile ? 'w-full' : 'w-80'
        } bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto`}
    >
      {isLoading && (
        <div className="p-4 text-center text-gray-500">Searching...</div>
      )}

      {!isLoading && searchTerm.length >= 2 && products.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No products found for "{searchTerm}"
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Search Results
          </div>
          {products.map((product) => (
            <button
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 text-left transition-colors"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {product.name}
                </div>
                <div className="text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {product.features[0]}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-yellow-400">
                <span className="text-sm">★</span>
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-50">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto px-4">
          {/* Logo */}
          <Link to="/">
            <img className="h-8" src={logo} alt="logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            <li>
              <Button variant="link" asChild>
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/products">Products</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </li>
            <li>
              <div className="relative" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="p-2 pr-10 rounded-lg border w-64"
                  value={searchTerm}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <HiX size={16} className="text-gray-400" />
                    </button>
                  )}
                  <HiOutlineSearch size="18" className="text-gray-400" />
                </div>

                {showSearchResults && <SearchPopup />}
              </div>
            </li>
            <li>
              <Cart />
            </li>
            <li className="ml-5">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  {!user.email && (
                    <>
                      <Link to="/login">
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  {user.email && (
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-md px-4 py-3 space-y-3">
            <div className="relative mb-3" ref={searchRef}>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 pr-10 rounded-lg border"
                value={searchTerm}
                onChange={(e) => handleSearchInputChange(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <HiX size={16} className="text-gray-400" />
                  </button>
                )}
                <HiOutlineSearch size="18" className="text-gray-400" />
              </div>

              {showSearchResults && <SearchPopup isMobile />}
            </div>

            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="link" className="w-full justify-start">
                Home
              </Button>
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="link" className="w-full justify-start">
                Products
              </Button>
            </Link>
            <Link to="/checkout" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="link" className="w-full justify-start">
                Checkout
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Cart />
            </div>
            <div className="border-t pt-3">
              {!user.email ? (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="default" className="w-full mt-2">
                      Signup
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="destructive"
                  className="w-full"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
