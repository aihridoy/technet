import { Link } from 'react-router-dom';
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
import { useState } from 'react';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

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
              <Button variant="ghost">
                <HiOutlineSearch size="22" />
              </Button>
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
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  {!user.email && (
                    <>
                      <Link to="/login">
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link to="/signup">
                        <DropdownMenuItem>Signup</DropdownMenuItem>
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
              <Button variant="ghost">
                <HiOutlineSearch size={22} />
              </Button>
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
