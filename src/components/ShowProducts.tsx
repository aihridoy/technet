import { Link } from 'react-router-dom';
import { Button } from './Button';

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

interface ShowProductsProps {
  featuredProducts: Product[];
  renderStars: (rating: number) => React.ReactNode;
}

export default function ShowProducts({
  featuredProducts,
  renderStars,
}: ShowProductsProps) {
  return (
    <div className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0 lg:px-0">
        {/* Featured Products Showcase */}
        {featuredProducts.length > 0 && (
          <div className="mb-20 relative">
            <div className="text-center mb-12">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold rounded-full border border-blue-200 mb-4">
                🏆 Featured Products
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Our Best Sellers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the most popular Haylou smartwatches loved by thousands
                of customers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product: Product, index: number) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        In Stock
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {renderStars(product.rating)}

                    <div className="mt-4 mb-4">
                      <span className="text-3xl font-black text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {product.features
                        .slice(0, 2)
                        .map((feature: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <svg
                              className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </div>
                        ))}
                    </div>

                    <Link to={`product-details/${product._id}`}>
                      <Button className="w-full py-3 rounded-xl text-sm font-semibold group-hover:shadow-lg transition-all duration-300">
                        View Details
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold rounded-full border border-blue-200">
              🚀 Innovation Unleashed
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent uppercase mb-8 leading-tight">
            The future of <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              tech is here
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the perfect blend of innovation, style, and
            functionality. Discover our complete range of cutting-edge products.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/products">
              <Button className="py-4 px-10 rounded-xl text-lg transform hover:scale-105 w-full sm:w-auto">
                Browse All Products
                <svg
                  className="ml-3 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </Link>

            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                  5K+
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  ⭐
                </div>
              </div>
              <span className="text-sm font-medium">
                Trusted by 5K+ customers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
