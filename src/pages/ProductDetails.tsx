import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetProductQuery } from '@/redux/features/products/productApi';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data } = useGetProductQuery(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 p-4 md:p-8 gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={data?.image}
            alt={data?.name}
            className="object-contain max-h-[400px] w-full"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold">{data?.name}</h1>
          <p className="text-lg md:text-xl">Rating: {data?.rating}</p>

          {data?.features && (
            <ul className="space-y-1 text-base md:text-lg list-disc list-inside">
              {data.features.map((feature: string) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}

          <Button className="w-full md:w-auto">Add to cart</Button>
        </div>
      </div>

      {/* Product Reviews */}
      {id && <ProductReview id={id} />}
    </>
  );
}
