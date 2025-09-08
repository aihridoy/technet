import { Button } from './Button';
import { Link } from 'react-router-dom';
import banner from '@/assets/images/banner.png';

interface HeroProps {
  isVisible: boolean;
  setShowVideoModal: (show: boolean) => void;
}

export default function Hero({ isVisible, setShowVideoModal }: HeroProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div
        className={`relative z-10 flex flex-col lg:flex-row justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto px-4 sm:px-6 md:px-0 lg:px-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex-1 max-w-2xl text-center lg:text-left mb-8 lg:mb-0">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
              ✨ Next Generation Wearable
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-none mb-6">
            HAYLOU <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SOLAR PULSE
            </span>
          </h1>

          <p className="text-gray-600 font-medium text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
            Effortless communication at your fingertips with
            <span className="text-blue-600 font-semibold">
              {' '}
              cutting-edge technology
            </span>
          </p>

          <div className="space-y-4 mb-12">
            <div className="flex items-center space-x-3 group justify-center lg:justify-start">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              <p className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
                Bluetooth 5.2 for easy, secure communication
              </p>
            </div>
            <div className="flex items-center space-x-3 group justify-center lg:justify-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              <p className="text-gray-700 font-medium group-hover:text-purple-600 transition-colors duration-300">
                Precise 1.43" AMOLED display for crystal clear visuals
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/products">
              <Button className="py-3 px-8 rounded-xl transform hover:scale-105 w-full sm:w-auto">
                View Products
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="py-3 px-8 rounded-xl w-full sm:w-auto"
              onClick={() => setShowVideoModal(true)}
            >
              Watch Demo
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div
            className="relative transform transition-transform duration-300 hover:scale-105"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl opacity-20 scale-110 animate-pulse"></div>
            <img
              src={banner}
              alt="Haylou Solar Pulse"
              className="relative z-10 max-w-full h-auto w-80 sm:w-96 lg:w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
