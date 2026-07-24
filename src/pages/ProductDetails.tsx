import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useGetProductQuery } from '@/redux/features/products/productApi';
import { useGetWishlistQuery, useToggleWishlistMutation } from '@/redux/features/wishlist/wishlistApi';
import { useAppDispatch } from '@/redux/hook';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus,
} from 'lucide-react';

// Loading skeleton
const ProductDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Breadcrumb skeleton */}
    <div className="flex items-center gap-2 mb-8">
      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-100 rounded-3xl animate-pulse"></div>

      {/* Info skeleton */}
      <div className="space-y-6">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="flex items-center gap-3">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-14 bg-gray-200 rounded-xl flex-1 animate-pulse"></div>
          <div className="h-14 bg-gray-200 rounded-xl flex-1 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Error component
const ProductDetailsError = ({
  onRetry,
  onGoBack,
}: {
  onRetry: () => void;
  onGoBack: () => void;
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
      <div className="text-red-400 mb-6">
        <svg
          className="w-20 h-20 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Product Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        We couldn't load the product details. The product might not exist or
        there was a network error.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRetry} className="px-6 py-3 rounded-xl">
          Try Again
        </Button>
        <Button onClick={onGoBack} variant="outline" className="px-6 py-3 rounded-xl">
          Go Back to Products
        </Button>
      </div>
    </div>
  </div>
);

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetProductQuery(id);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    skip: !user?.email,
  });
  const [toggleWishlist] = useToggleWishlistMutation();

  const product: IProduct | undefined = data;

  const wishlistItems = wishlistData?.data || [];
  const isWishlisted = id ? wishlistItems.some((item: { productId: string }) => item.productId === id) : false;

  const handleAddProduct = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast({
      description: `${quantity} item${quantity > 1 ? 's' : ''} added to cart`,
    });
  };

  const handleWishlist = async () => {
    if (!user?.email) {
      toast({
        description: 'Please log in to add to wishlist',
        variant: 'destructive',
      });
      return;
    }
    try {
      await toggleWishlist(id).unwrap();
      toast({
        description: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      });
    } catch {
      toast({
        description: 'Failed to update wishlist',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        description: 'Link copied to clipboard',
      });
    } catch {
      toast({
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const handleRetry = () => refetch();
  const handleGoBack = () => navigate('/products');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError) return <ProductDetailsError onRetry={handleRetry} onGoBack={handleGoBack} />;
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Product Not Available
          </h2>
          <p className="text-gray-500 mb-8">
            The product you're looking for is no longer available.
          </p>
          <Button onClick={handleGoBack} className="px-6 py-3 rounded-xl">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-5 h-5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/products" className="hover:text-gray-900 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative bg-gray-50 p-8 lg:p-12">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className={`w-full aspect-square object-cover rounded-2xl transition-all duration-500 hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  setImageLoaded(true);
                }}
              />

              {/* Category Badge */}
              {product.category && (
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              {/* Status Badge */}
              <div className="mb-4">
                {product.status ? (
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full">
                    <Check className="w-4 h-4" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-sm font-medium px-3 py-1.5 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.rating}
                  </span>
                  <span className="text-gray-500">
                    ({product.ratingCount ?? 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500 ml-2">tax included</span>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              {product.status && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
                <Button
                  onClick={handleAddProduct}
                  disabled={!product.status}
                  className={`flex-1 py-6 text-base font-semibold rounded-xl transition-all ${
                    product.status
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.status ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <button
                  onClick={handleWishlist}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-600 transition-all"
                  title="Copy link"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500">30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white rounded-3xl border border-gray-100 p-8 lg:p-12">
          <ProductReview id={id!} />
        </div>
      </div>
    </div>
  );
}
