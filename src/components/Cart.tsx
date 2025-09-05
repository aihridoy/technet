import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addToCart,
  removeFromCart,
  removeOne,
} from '@/redux/features/cart/cartSlice';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  const { products, total } = useAppSelector((state) => state.cart);
  const typedProducts: IProduct[] = products;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isOnCheckoutPage = location.pathname === '/checkout';

  const handleCheckoutClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <HiOutlineShoppingCart size="25" />
          {typedProducts.length > 0 && (
            <span className="absolute -top-2 -right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {typedProducts.reduce(
                (acc, product) => acc + (product.quantity || 0),
                0
              )}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-auto relative w-full sm:max-w-lg">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="text-lg sm:text-xl">Shopping Cart</SheetTitle>
          <div className="text-right">
            <p className="text-lg sm:text-xl font-semibold text-green-600">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </SheetHeader>

        {typedProducts.length === 0 ? (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <HiOutlineShoppingCart size="64" className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500">Add some products to get started!</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 py-4">
              {typedProducts.map((product) => (
                <div
                  className="border rounded-lg p-3 sm:p-4"
                  key={product.name}
                >
                  {/* Mobile Layout (< sm screens) */}
                  <div className="block sm:hidden">
                    <div className="flex gap-3 mb-3">
                      <div className="flex-shrink-0 w-20 h-20">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {product?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {product.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          $
                          {(product.price * (product.quantity ?? 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => dispatch(removeOne(product))}
                          className="h-8 w-8 p-0"
                        >
                          <HiMinus size="14" />
                        </Button>
                        <span className="mx-2 text-sm font-medium min-w-[2rem] text-center">
                          {product.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => dispatch(addToCart(product))}
                          className="h-8 w-8 p-0"
                        >
                          <HiOutlinePlus size="14" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => dispatch(removeFromCart(product))}
                        variant="destructive"
                        className="h-8 w-8 p-0 bg-red-500 hover:bg-red-400"
                      >
                        <HiOutlineTrash size="14" />
                      </Button>
                    </div>
                  </div>

                  {/* Desktop Layout (sm+ screens) */}
                  <div className="hidden sm:flex justify-between items-center">
                    <div className="flex gap-4 flex-1">
                      <div className="flex-shrink-0 w-16 h-16 border-r pr-4">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {product?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          $
                          {(product.price * (product.quantity ?? 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="flex flex-col gap-2 border-l pl-4">
                      <Button
                        size="sm"
                        onClick={() => dispatch(addToCart(product))}
                        className="h-8 w-8 p-0"
                      >
                        <HiOutlinePlus size="16" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => dispatch(removeOne(product))}
                        className="h-8 w-8 p-0"
                      >
                        <HiMinus size="16" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => dispatch(removeFromCart(product))}
                        variant="destructive"
                        className="h-8 w-8 p-0 bg-red-500 hover:bg-red-400"
                      >
                        <HiOutlineTrash size="16" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Section - Only show if not on checkout page */}
            {!isOnCheckoutPage && (
              <div className="border-t pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">Subtotal:</span>
                  <span className="text-lg font-semibold">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link to="/checkout" onClick={handleCheckoutClick}>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-xs text-gray-500 text-center">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}

            {/* Alternative section for checkout page */}
            {isOnCheckoutPage && (
              <div className="border-t pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">Cart Total:</span>
                  <span className="text-lg font-semibold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  You're currently in checkout
                </p>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
