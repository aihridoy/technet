import { useGetWishlistQuery, useToggleWishlistMutation } from '@/redux/features/wishlist/wishlistApi';
import { useGetProductQuery } from '@/redux/features/products/productApi';
import { useAppSelector } from '@/redux/hook';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { toast } from '@/components/ui/use-toast';
import { IProduct } from '@/types/globalTypes';

function WishlistItem({ productId }: { productId: string }) {
  const { data, isLoading } = useGetProductQuery(productId);
  const [toggleWishlist] = useToggleWishlistMutation();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const product: IProduct | undefined = data;

  if (!product) return null;

  const handleRemove = async () => {
    try {
      await toggleWishlist(productId).unwrap();
      toast({ description: 'Removed from wishlist' });
    } catch {
      toast({ description: 'Failed to remove from wishlist', variant: 'destructive' });
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast({ description: 'Added to cart' });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <Link to={`/product-details/${product._id}`} className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-xl"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to={`/product-details/${product._id}`}
            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          <p className="text-lg font-bold text-gray-900 mt-1">${product.price}</p>
          <p className="text-sm text-gray-500 mt-1">
            {product.status ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.status}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Wishlist() {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetWishlistQuery(undefined, {
    skip: !user?.email,
  });

  const wishlistItems = data?.data || [];

  if (!user?.email) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-3xl border border-gray-100 p-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist</h2>
            <p className="text-gray-500 mb-6">Log in to see your saved items</p>
            <Link to="/login">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-500">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item: { _id: string; productId: string }) => (
              <WishlistItem key={item._id} productId={item.productId} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-3xl border border-gray-100 p-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Save items you love by clicking the heart icon
            </p>
            <Link to="/products">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
