import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();
  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div className="flex justify-center">
      <div className="rounded-2xl w-full max-w-sm h-auto min-h-[400px] sm:min-h-[450px] flex flex-col items-start justify-between p-3 sm:p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product._id}`} className="w-full">
          <div className="w-full h-48 sm:h-64 overflow-hidden">
            <img
              src={product?.image}
              alt="product"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mt-2 truncate">
            {product?.name}
          </h1>
        </Link>
        <p className="text-sm sm:text-base">Rating: {product?.rating}</p>
        <p className="text-xs sm:text-sm">
          Availability: {product?.status ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm sm:text-base">Price: ${product?.price}</p>
        <Button
          variant="default"
          className="w-full sm:w-auto text-sm sm:text-base"
          onClick={() => handleAddProduct(product)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
