import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useGetProductQuery } from '@/redux/features/products/productApi';
import { useAppDispatch } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

// Loading skeleton for product details
const ProductDetailsSkeleton = () => (
  <>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 p-4 md:p-8 gap-6">
      {/* Product Image Skeleton */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="animate-pulse bg-gray-200 rounded-lg h-[400px] w-full max-w-md"></div>
      </div>

      {/* Product Info Skeleton */}
      <div className="w-full md:w-1/2 space-y-4">
        <div className="animate-pulse space-y-4">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>

          {/* Rating skeleton */}
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>

          {/* Features skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>

    {/* Reviews section skeleton */}
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// Error component for product details
const ProductDetailsError = ({
  onRetry,
  onGoBack,
}: {
  onRetry: () => void;
  onGoBack: () => void;
}) => (
  <div className="max-w-7xl mx-auto p-4 md:p-8">
    <div className="text-center py-16">
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
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We couldn't load the product details. The product might not exist or
        there was a network error.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRetry} variant="default" className="px-6 py-2">
          Try Again
        </Button>
        <Button onClick={onGoBack} variant="outline" className="px-6 py-2">
          Go Back to Products
        </Button>
      </div>
    </div>
  </div>
);

// Product not found component
const ProductNotFound = ({ onGoBack }: { onGoBack: () => void }) => (
  <div className="max-w-7xl mx-auto p-4 md:p-8">
    <div className="text-center py-16">
      <div className="text-gray-400 mb-6">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.346 0-4.462.725-6.043 1.977M6.343 8.343A8 8 0 1019.657 15.657 8 8 0 006.343 8.343z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Product Not Available
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The product you're looking for is no longer available or has been
        removed.
      </p>
      <Button onClick={onGoBack} variant="default" className="px-6 py-2">
        Browse Other Products
      </Button>
    </div>
  </div>
);

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetProductQuery(id);
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };

  const handleRetry = () => {
    refetch();
  };

  const handleGoBack = () => {
    navigate('/products');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle loading state
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // Handle error state
  if (isError) {
    return (
      <ProductDetailsError onRetry={handleRetry} onGoBack={handleGoBack} />
    );
  }

  // Handle case where data is null/undefined but no error
  if (!data) {
    return <ProductNotFound onGoBack={handleGoBack} />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 p-4 md:p-8 gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={data.image}
            alt={data.name || 'Product image'}
            className="object-contain max-h-[400px] w-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                'https://via.placeholder.com/400x400?text=Image+Not+Available';
            }}
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {data.name || 'Product Name Not Available'}
          </h1>

          {data.rating && (
            <div className="flex items-center space-x-2">
              <span className="text-lg md:text-xl">Rating:</span>
              <div className="flex items-center">
                <span className="text-lg md:text-xl font-medium">
                  {data.rating}
                </span>
                <div className="flex ml-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(data.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data.price && (
            <div className="text-xl md:text-2xl font-bold text-green-600">
              ${data.price}
            </div>
          )}

          {data.features && data.features.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Features:</h3>
              <ul className="space-y-1 text-base md:text-lg list-disc list-inside">
                {data.features.map((feature: string, index: number) => (
                  <li key={`${feature}-${index}`}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {data.status !== undefined && (
            <div className="flex items-center space-x-2">
              <span className="text-base md:text-lg">Availability:</span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  data.status
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {data.status ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          )}

          <Button
            onClick={() => handleAddProduct(data)}
            className="w-full md:w-auto"
            disabled={data.status === false}
          >
            {data.status === false ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      {/* Product Reviews */}
      {id && <ProductReview id={id} />}
    </>
  );
}
