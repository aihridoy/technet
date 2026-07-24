import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from '@/redux/features/order/orderApi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface AdminOrder {
  _id: string;
  userEmail: string;
  name: string;
  city: string;
  total: number;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const { data, isLoading } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders: AdminOrder[] = data?.data || [];

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateOrderStatus({ id, status }).unwrap();
      toast({ description: 'Order status updated' });
    } catch (err) {
      toast({ description: 'Failed to update order status', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">City</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">#{order._id.slice(-6)}</td>
                  <td className="p-3">
                    {order.name}
                    <div className="text-xs text-gray-500">{order.userEmail}</div>
                  </td>
                  <td className="p-3">{order.city}</td>
                  <td className="p-3">${order.total.toFixed(2)}</td>
                  <td className="p-3">
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order._id, value)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
