import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';

import { useState } from 'react';

export default function Checkout() {
  const [scheduled, setScheduled] = useState<boolean>(false);
  const { products, total } = useAppSelector((state) => state.cart);
  const typedProducts: IProduct[] = products;

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 p-4 md:p-10 text-primary">
      {/* Delivery Information */}
      <div className="w-full md:w-2/3 max-w-3xl">
        <h1 className="mb-2 text-xl md:text-2xl font-semibold">
          Delivery Information
        </h1>
        <div className="border border-gray-300 rounded-md p-5 md:p-10 max-h-[70vh] overflow-auto space-y-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" className="mt-2" />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input type="text" id="phone" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" className="mt-2" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" className="mt-2" />
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-lg">Scheduled Delivery</Label>
            <Switch onClick={() => setScheduled(!scheduled)} />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <Label htmlFor="note">Note</Label>
              <Input
                disabled={!scheduled}
                type="text"
                id="note"
                className="mt-2"
              />
            </div>
            <div className="w-full flex flex-col mt-2">
              <Label className="mb-2" htmlFor="date">
                Date
              </Label>
              <DatePickerWithPresets disabled={!scheduled} />
            </div>
          </div>

          <div>
            <Label className="text-lg">Payment method</Label>
            <RadioGroup
              defaultValue="online"
              className="flex flex-col sm:flex-row gap-5 mt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="online"
                  id="r1"
                  className="border border-gray-400"
                />
                <Label htmlFor="r1">Online payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="cash"
                  id="r2"
                  className="border border-gray-400"
                />
                <Label htmlFor="r2">Cash on delivery</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-1/3 max-w-lg">
        <h1 className="mb-2 text-xl md:text-2xl font-semibold">
          Order Summary
        </h1>
        <div className="border border-gray-300 rounded-md p-5 md:p-10 max-h-[70vh] flex flex-col">
          <div className="flex-grow space-y-2 overflow-auto mb-4">
            {typedProducts.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={product.image}
                    className="h-[80px] w-[80px] rounded-md object-cover"
                    alt=""
                  />
                  <div>
                    <h1 className="text-sm md:text-lg font-medium">
                      {product.name}
                    </h1>
                    <p className="text-sm md:text-base">
                      Price: {product.price}$
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold">
                    {product.quantity}
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-base md:text-lg">
              <p>Subtotal</p>
              <p>{total.toFixed(2)}$</p>
            </div>
            <div className="flex justify-between text-base md:text-lg">
              <p>Delivery</p>
              <p>4.5$</p>
            </div>
            <div className="flex justify-between text-lg md:text-xl font-bold">
              <p>Total</p>
              <p>{(total + 4.5).toFixed(2)}$</p>
            </div>
            <Button className="w-full mt-2">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
