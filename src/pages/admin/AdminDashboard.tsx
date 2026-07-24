import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>
      <div className="flex justify-center gap-6">
        <Link
          to="/admin/products"
          className="px-8 py-6 border rounded-xl hover:shadow-lg transition-shadow text-lg font-medium"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="px-8 py-6 border rounded-xl hover:shadow-lg transition-shadow text-lg font-medium"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );
}
