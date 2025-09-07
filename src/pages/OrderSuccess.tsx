import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-14 w-14 text-green-500 drop-shadow-md" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Order Confirmed 🎉
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Thank you for your purchase! We’ll send you updates when your order is
          on the way.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white px-6"
          >
            <Link to="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gray-300 hover:bg-gray-100"
          >
            <Link to="/orders">View My Orders</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
