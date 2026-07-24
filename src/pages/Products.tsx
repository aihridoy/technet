import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetProductsPaginatedQuery } from '@/redux/features/products/productApi';
import {
  setPriceRange,
  setCategory,
  setMinRating,
  resetFilters,
  toggleStatus,
} from '@/redux/features/products/productSlice';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Star, X, SlidersHorizontal } from 'lucide-react';

// Loading skeleton component
const ProductSkeleton = () => (
  <div className="animate-pulse bg-white rounded-2xl overflow-hidden">
    <div className="bg-gray-200 h-56 sm:h-64"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
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

const CATEGORIES = [
  'All',
  'Haylou Smart Watches',
  'Apple Watches',
  'Samsung Galaxy Watches',
  'Garmin Watches',
  'Casio Watches',
  'Seiko Watches',
  'Orient Watches',
  'Citizen Watches',
  'Fitbit Watches',
  'Amazfit Watches',
  'Huawei Watches',
];

export default function Products() {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data, isLoading, isError, isFetching } = useGetProductsPaginatedQuery({
    page,
    limit: 12,
  });

  const { status, priceRange, category, minRating } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const prevFiltersRef = useRef({ status, priceRange, category, minRating });

  // Detect filter changes and reset page (but keep old products visible)
  useEffect(() => {
    const prev = prevFiltersRef.current;
    const changed =
      prev.status !== status ||
      prev.priceRange !== priceRange ||
      prev.category !== category ||
      prev.minRating !== minRating;

    if (changed) {
      setPage(1);
      prevFiltersRef.current = { status, priceRange, category, minRating };
    }
  }, [status, priceRange, category, minRating]);

  // Accumulate products as new pages load
  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        // When page 1 loads, replace products (new data after filter change or initial load)
        setAllProducts(data.data);
      } else {
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const newProducts = data.data.filter(
            (p: IProduct) => !existingIds.has(p._id)
          );
          return [...prev, ...newProducts];
        });
      }
    }
  }, [data, page]);

  // Intersection Observer for infinite scroll
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.pagination?.hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, data?.pagination?.hasMore]
  );

  const handleRetry = () => {
    setPage(1);
    setAllProducts([]);
    dispatch(resetFilters());
  };

  // Apply client-side filters
  let productsData: IProduct[] = [];

  if (allProducts.length > 0) {
    productsData = allProducts.filter((item) => {
      // Status filter
      if (status && !item.status) return false;

      // Price filter
      if (item.price >= priceRange) return false;

      // Category filter
      if (category !== 'All' && item.category !== category) return false;

      // Rating filter
      if (minRating > 0 && item.rating < minRating) return false;

      return true;
    });
  }

  const hasMore = data?.pagination?.hasMore ?? false;
  const totalProducts = data?.pagination?.total ?? 0;

  const activeFilterCount =
    (status ? 1 : 0) +
    (priceRange < 2500 ? 1 : 0) +
    (category !== 'All' ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 hidden lg:block">
            <div className="animate-pulse bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-32 mt-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage onRetry={handleRetry} />
      </div>
    );
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Header with clear filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Availability
        </h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="in-stock" className="text-sm text-gray-600 cursor-pointer">
            In Stock Only
          </Label>
          <Switch
            id="in-stock"
            checked={status}
            onCheckedChange={() => dispatch(toggleStatus())}
          />
        </div>
      </div>

      <div className="border-t border-gray-100"></div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Price Range
        </h3>
        <Slider
          max={2500}
          min={0}
          step={50}
          value={[priceRange]}
          onValueChange={(value) => dispatch(setPriceRange(value[0]))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$0</span>
          <span className="font-medium text-gray-900">${priceRange}</span>
        </div>
      </div>

      <div className="border-t border-gray-100"></div>

      {/* Category */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Category
        </h3>
        <div className="max-h-48 overflow-y-auto space-y-1 pr-2 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                category === cat
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100"></div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => dispatch(setMinRating(minRating === rating ? 0 : rating))}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                minRating === rating
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 bg-white rounded-2xl border border-gray-100 p-5">
            <FilterSidebar />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-9">
          {/* Product count and active filters */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-medium text-gray-900">{productsData.length}</span>{' '}
              of <span className="font-medium text-gray-900">{totalProducts}</span>{' '}
              products
            </span>

            {/* Active filter badges */}
            {status && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                In Stock Only
                <button onClick={() => dispatch(toggleStatus())} className="hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {category !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {category}
                <button onClick={() => dispatch(setCategory('All'))} className="hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {minRating}+ Stars
                <button onClick={() => dispatch(setMinRating(0))} className="hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {productsData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData.map((product: IProduct, index) => {
                  if (index === productsData.length - 1) {
                    return (
                      <div ref={lastProductRef} key={product._id}>
                        <ProductCard product={product} />
                      </div>
                    );
                  }
                  return (
                    <ProductCard product={product} key={product._id} />
                  );
                })}
              </div>

              {/* Loading more indicator */}
              {isFetching && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ProductSkeleton key={`loading-${index}`} />
                  ))}
                </div>
              )}

              {/* End of list */}
              {!hasMore && productsData.length > 0 && (
                <div className="text-center py-10 mt-6 border-t border-gray-100">
                  <p className="text-gray-500">
                    You've seen all {totalProducts} products
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="text-gray-300 mb-4">
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={() => dispatch(resetFilters())}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
