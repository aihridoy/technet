export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HAYLOU
              </h2>
              <p className="text-sm text-gray-400 mt-1">Solar Pulse Series</p>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading the future of wearable technology with innovative
              smartwatches that combine style, functionality, and cutting-edge
              features.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Products</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Haylou Solar Pulse
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Haylou RS4 Plus
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Haylou RS3
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Haylou RT2
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Haylou GST
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Haylou GS
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  All Products
                </span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  User Manual
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Warranty
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Repair Service
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Live Chat
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  FAQ
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Careers
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Press
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Blog
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Investors
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Partners
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Sustainability
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Get the latest news about new products and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing, you agree to our Privacy Policy and Terms of
              Service
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center lg:text-left">
              <p>
                &copy; {currentYear} Haylou Technology. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              <span className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                Terms of Service
              </span>
              <span className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                Cookie Policy
              </span>
              <span className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                Accessibility
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              {/* Quality Assurance */}
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Quality Guaranteed
                  </h4>
                  <p className="text-xs text-gray-400">
                    2-year warranty on all products
                  </p>
                </div>
              </div>

              {/* Free Shipping */}
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Free Shipping
                  </h4>
                  <p className="text-xs text-gray-400">
                    On orders over $50 worldwide
                  </p>
                </div>
              </div>

              {/* 24/7 Support */}
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-6.364 15.364M12 6.75v6m-3-3h6"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    24/7 Support
                  </h4>
                  <p className="text-xs text-gray-400">
                    Expert customer service team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
