import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import {
  setPriceRange,
  toggleStatus,
} from '@/redux/features/products/productSlice';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Loading skeleton component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

// Error component
const ErrorMessage = ({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center py-12">
    <div className="text-red-400 mb-4">
      <svg
        className="w-16 h-16 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-500 mb-4">
      We couldn't load the products. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
);

export default function Products() {
  const { data, isLoading, isError, refetch } = useGetProductsQuery(undefined);
  const { status, priceRange } = useAppSelector((state) => state.product);
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  const handleRetry = () => {
    refetch();
  };

  let productsData;

  if (data?.data) {
    if (status) {
      productsData = data.data.filter(
        (item: { status: boolean; price: number }) =>
          item.status === true && item.price < priceRange
      );
    } else if (priceRange > 0) {
      productsData = data.data.filter(
        (item: { price: number }) => item.price < priceRange
      );
    } else {
      productsData = data.data;
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Loading Filter Sidebar */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="animate-pulse border rounded-2xl border-gray-200/80 p-4 sm:p-5">
              <div className="space-y-5">
                <div>
                  <div className="h-6 bg-gray-200 rounded w-24 mb-3"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
                  <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Products Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorMessage onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
          </svg>
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        {/* Sidebar - Hidden on mobile by default, shown when toggled */}
        <div
          className={`
          lg:col-span-3 
          ${showFilters ? 'block' : 'hidden lg:block'} 
          lg:mr-6 
          space-y-5 
          border 
          rounded-2xl 
          border-gray-200/80 
          p-4 sm:p-5 
          lg:self-start 
          lg:sticky 
          lg:top-16 
          lg:h-[calc(100vh-80px)]
          mb-6 lg:mb-0
        `}
        >
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl uppercase font-medium">
              Availability
            </h1>
            <div className="flex items-center space-x-2 mt-3">
              <Switch id="in-stock" onClick={() => dispatch(toggleStatus())} />
              <Label htmlFor="in-stock" className="text-sm sm:text-base">
                In stock
              </Label>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-lg sm:text-2xl uppercase font-medium">
              Price Range
            </h1>
            <div className="w-full">
              <Slider
                defaultValue={[150]}
                max={150}
                min={0}
                step={1}
                onValueChange={(value) => handleSlider(value)}
                className="w-full"
              />
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              From $0 to ${priceRange}
            </div>
          </div>

          {/* Mobile Apply Button */}
          <div className="lg:hidden pt-4 border-t">
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-9">
          {productsData && productsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 pb-10 sm:pb-20">
              {productsData.map((product: IProduct) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
