'use client';

import { useGetOrdersQuery } from '@/redux/features/order/orderApi';
import { useAppSelector } from '@/redux/hook';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Package,
  ShoppingBag,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
} from 'lucide-react';
import { format } from 'date-fns';

interface Order {
  _id: string;
  userEmail: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  deliveryDate?: string;
  paymentMethod: 'online' | 'cash';
  products: Array<{
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'processing';
  createdAt: string;
}

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useGetOrdersQuery(undefined);

  // Filter orders by user email
  const userOrders = user?.email
    ? data?.data?.filter((order: Order) => order.userEmail === user.email) || []
    : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200';
      case 'completed':
        return 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8 relative overflow-hidden">
            {/* Header gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>

            <div className="relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                    <div className="h-full w-full rounded-2xl bg-white flex items-center justify-center">
                      <span className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    Welcome back!
                  </h1>
                  <div className="flex items-center gap-2 text-lg text-gray-600 mb-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">
                      {user?.email || 'Guest User'}
                    </span>
                  </div>
                  <p className="text-gray-500 max-w-md">
                    {user?.email
                      ? 'Track your orders, manage your profile, and explore your purchase history.'
                      : 'Please log in to access your personalized dashboard and order history.'}
                  </p>
                </div>

                {/* Stats Cards */}
                {user?.email && (
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">
                        {userOrders.length}
                      </div>
                      <div className="text-sm text-blue-600">Total Orders</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-700">
                        $
                        {userOrders
                          .reduce(
                            (sum: number, order: { total: number }) =>
                              sum + order.total,
                            0
                          )
                          .toFixed(0)}
                      </div>
                      <div className="text-sm text-green-600">Total Spent</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Order History
                    </h2>
                    <p className="text-sm text-gray-500">
                      Track and manage your orders
                    </p>
                  </div>
                </div>
                {userOrders.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                )}
              </div>
            </div>

            <div className="p-6">
              {isLoading && (
                <div className="flex justify-center items-center py-16">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      Loading your orders...
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center py-16">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-700 font-medium mb-2">
                      Unable to load orders
                    </p>
                    <p className="text-red-600 text-sm">
                      Please check your connection and try again.
                    </p>
                  </div>
                </div>
              )}

              {!isLoading && !error && userOrders.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="h-24 w-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start exploring our amazing products and place your first
                      order!
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <a href="/products">Start Shopping</a>
                    </Button>
                  </div>
                </div>
              )}

              {!isLoading && !error && userOrders.length > 0 && (
                <div className="space-y-6">
                  {userOrders.map((order: Order, index: number) => (
                    <div
                      key={order._id}
                      className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">
                                Order #{order._id.slice(-6)}
                              </h3>
                              <div
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              Placed on{' '}
                              {format(new Date(order.createdAt), 'PPP')}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ${order.total.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.products.length} items
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-4"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Order Content */}
                      <div className="p-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                          {/* Delivery Information */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-blue-500" />
                              Delivery Information
                            </h4>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                              <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="font-medium text-gray-900">
                                  {order.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-700">
                                  {order.phone}
                                </span>
                              </div>
                              <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-700">
                                  {order.address}, {order.city}
                                </span>
                              </div>
                              {order.deliveryDate && (
                                <div className="flex items-center gap-3">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-700">
                                    {format(
                                      new Date(order.deliveryDate),
                                      'PPP'
                                    )}
                                  </span>
                                </div>
                              )}
                              {order.note && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                  <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> {order.note}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              <Package className="h-5 w-5 text-green-500" />
                              Order Items
                            </h4>
                            <div className="space-y-3">
                              {order.products.map((product) => (
                                <div
                                  key={product._id}
                                  className="bg-gray-50 rounded-xl p-4 flex justify-between items-center"
                                >
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Quantity: {product.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                      $
                                      {(
                                        product.price * product.quantity
                                      ).toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      ${product.price.toFixed(2)} each
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span>${order.deliveryFee.toFixed(2)}</span>
                              </div>
                              <div className="border-t border-gray-300 pt-2">
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                  <span>Total</span>
                                  <span>${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-sm text-gray-500 pt-2">
                                <span className="flex items-center gap-1">
                                  <CreditCard className="h-4 w-4" />
                                  Payment Method
                                </span>
                                <span className="font-medium">
                                  {order.paymentMethod === 'online'
                                    ? 'Online Payment'
                                    : 'Cash on Delivery'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
