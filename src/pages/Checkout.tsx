'use client';

import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCreateOrderMutation } from '@/redux/features/order/orderApi';

interface CheckoutFormInputs {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  deliveryDate?: Date;
  paymentMethod: 'online' | 'cash';
}

export default function Checkout() {
  const [scheduled, setScheduled] = useState<boolean>(false);
  const { products, total } = useAppSelector((state) => state.cart);
  const typedProducts: IProduct[] = products;
  const { user } = useAppSelector((state) => state.user);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CheckoutFormInputs>({
    defaultValues: {
      email: user?.email || '',
      paymentMethod: 'online',
    },
  });

  const onSubmit = async (data: CheckoutFormInputs) => {
    try {
      const orderData = {
        userEmail: data.email,
        name: data.name,
        phone: data.phone,
        city: data.city,
        address: data.address,
        note: scheduled ? data.note : undefined,
        deliveryDate: scheduled ? data.deliveryDate?.toISOString() : undefined,
        paymentMethod: data.paymentMethod,
        products: typedProducts.map((p) => ({
          _id: p._id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
        subtotal: total,
        deliveryFee: 4.5,
        total: total + 4.5,
        status: data.paymentMethod === 'cash' ? 'pending' : 'processing',
        createdAt: new Date().toISOString(),
      };

      if (data.paymentMethod === 'online') {
        // Placeholder for online payment (e.g., Stripe)
        console.log('Initiating online payment for:', orderData);
        // Example: const paymentIntent = await initiateStripePayment(orderData);
        // If payment succeeds, proceed with order creation
      }

      const response = await createOrder(orderData).unwrap();
      if (response.status) {
        navigate('/order-confirmation', {
          state: { orderId: response.data.insertedId },
        });
      } else {
        throw new Error('Failed to create order');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 p-4 md:p-10 text-primary">
      {/* Delivery Information */}
      <div className="w-full md:w-2/3 max-w-3xl">
        <h1 className="mb-2 text-xl md:text-2xl font-semibold">
          Delivery Information
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-300 rounded-md p-5 md:p-10 max-h-[70vh] overflow-auto space-y-5"
        >
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  className="mt-2"
                  disabled={isLoading}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  className="mt-2"
                  disabled={isLoading || !!user?.email}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="text"
                  id="phone"
                  className="mt-2"
                  disabled={isLoading}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid phone number',
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  className="mt-2"
                  disabled={isLoading}
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              className="mt-2"
              disabled={isLoading}
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-lg">Scheduled Delivery</Label>
            <Switch
              checked={scheduled}
              onCheckedChange={(checked) => {
                setScheduled(checked);
                if (!checked) {
                  setValue('note', undefined);
                  setValue('deliveryDate', undefined);
                }
              }}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <Label htmlFor="note">Note</Label>
              <Input
                type="text"
                id="note"
                className="mt-2"
                disabled={!scheduled || isLoading}
                {...register('note', {
                  required: scheduled
                    ? 'Note is required for scheduled delivery'
                    : false,
                })}
              />
              {errors.note && (
                <p className="text-xs text-red-500">{errors.note.message}</p>
              )}
            </div>
            <div className="w-full flex flex-col mt-2">
              <Label className="mb-2" htmlFor="date">
                Date
              </Label>
              <DatePickerWithPresets
                disabled={!scheduled || isLoading}
                onDateChange={(date: Date | undefined) =>
                  setValue('deliveryDate', date, { shouldValidate: true })
                }
              />
              {errors.deliveryDate && (
                <p className="text-xs text-red-500">
                  {errors.deliveryDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-lg">Payment Method</Label>
            <Controller
              name="paymentMethod"
              control={control}
              rules={{ required: 'Payment method is required' }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue('paymentMethod', value as 'online' | 'cash', {
                      shouldValidate: true,
                    });
                  }}
                  className="flex flex-col sm:flex-row gap-5 mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="online"
                      id="r1"
                      className="border border-gray-400"
                    />
                    <Label htmlFor="r1">Online Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cash"
                      id="r2"
                      className="border border-gray-400"
                    />
                    <Label htmlFor="r2">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.paymentMethod && (
              <p className="text-xs text-red-500">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {(error as any)?.data?.error || 'Failed to process order'}
            </p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full mt-2">
            {isLoading ? 'Processing...' : 'Checkout'}
          </Button>
        </form>
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
          </div>
        </div>
      </div>
    </div>
  );
}
