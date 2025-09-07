import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import Hero from '@/components/Hero';
import ShowProducts from '@/components/ShowProducts';
import Featured from '@/components/Featured';

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

interface ApiResponse {
  status: boolean;
  data: Product[];
}

export default function Home(): JSX.Element {
  const { data }: { data?: ApiResponse } = useGetProductsQuery(undefined);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setShowVideoModal(false);
      }
    };

    if (showVideoModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showVideoModal]);

  // Get featured products (top 3 with highest ratings and available status)
  const getFeaturedProducts = (): Product[] => {
    if (!data?.data) return [];
    return data.data
      .filter((product: Product) => product.status)
      .sort((a: Product, b: Product) => b.rating - a.rating)
      .slice(0, 3);
  };

  const featuredProducts = getFeaturedProducts();

  const renderStars = (rating: number): JSX.Element => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}.0)</span>
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
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
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/JPmgUT_Bph4?si=wjWF1opFrIuV-253&autoplay=1"
                title="Haylou Solar Pulse Demo"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero isVisible={isVisible} setShowVideoModal={setShowVideoModal} />

      {/* Product Showcase Section */}
      <ShowProducts
        featuredProducts={featuredProducts}
        renderStars={renderStars}
      />

      {/* Features Grid */}
      <Featured />
    </>
  );
}
