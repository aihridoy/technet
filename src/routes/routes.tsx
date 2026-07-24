import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import Wishlist from '@/pages/Wishlist';
import PrivateRoute from './PrivateRoute';
import { OrderConfirmation } from '@/pages/OrderSuccess';
import AdminRoute from './AdminRoute';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/checkout',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: '/wishlist',
        element: <Wishlist />,
      },
      {
        path: '/admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/products',
        element: (
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/orders',
        element: (
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/order-confirmation',
    element: (
      <PrivateRoute>
        <OrderConfirmation />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
