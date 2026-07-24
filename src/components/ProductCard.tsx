import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();
  const isInStock = product?.status;

  const handleAddProduct = (e: React.MouseEvent, product: IProduct) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInStock) {
      toast({
        description: 'This product is out of stock',
        variant: 'destructive',
      });
      return;
    }
    dispatch(addToCart(product));
    toast({
      description: 'Product Added to Cart',
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <Link to={`/product-details/${product._id}`} className="block group">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-56 sm:h-64 bg-gray-50 overflow-hidden">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Out of Stock Badge */}
          {!isInStock && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <Eye className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category Badge */}
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit mb-2">
            {product?.category || 'Watch'}
          </span>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {renderStars(product?.rating || 0)}
            </div>
            <span className="text-sm text-gray-500">
              ({product?.ratingCount ?? 0})
            </span>
          </div>

          {/* Price and Action */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                ${product?.price}
              </span>
            </div>
            <Button
              size="sm"
              className={`rounded-full px-4 ${
                isInStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={(e) => handleAddProduct(e, product)}
              disabled={!isInStock}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              {isInStock ? 'Add' : 'Sold Out'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
