import { useState } from 'react';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '@/redux/features/products/productApi';
import { IProduct } from '@/types/globalTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';

interface ProductFormState {
  name: string;
  image: string;
  price: string;
  features: string;
  status: boolean;
}

const emptyForm: ProductFormState = {
  name: '',
  image: '',
  price: '',
  features: '',
  status: true,
};

export default function AdminProducts() {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);

  const products: IProduct[] = data?.data || [];

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (product: IProduct) => {
    setEditingId(String(product._id));
    setForm({
      name: product.name,
      image: product.image,
      price: String(product.price),
      features: product.features.join('\n'),
      status: product.status,
    });
    setOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name: form.name,
      image: form.image,
      price: Number(form.price),
      features: form.features.split('\n').filter((f) => f.trim() !== ''),
      status: form.status,
    };

    try {
      if (editingId) {
        await updateProduct({ id: editingId, data: payload }).unwrap();
        toast({ description: 'Product updated' });
      } else {
        await addProduct({ ...payload, rating: 0, ratingCount: 0 }).unwrap();
        toast({ description: 'Product created' });
      }
      setOpen(false);
    } catch (err) {
      toast({ description: 'Failed to save product', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id).unwrap();
      toast({ description: 'Product deleted' });
    } catch (err) {
      toast({ description: 'Failed to delete product', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button onClick={openCreate}>Add Product</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{editingId ? 'Edit Product' : 'New Product'}</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.status}
                  onCheckedChange={(checked) => setForm({ ...form, status: checked })}
                />
                <Label>In stock</Label>
              </div>
              <Button type="submit" disabled={isAdding || isUpdating} className="w-full">
                {editingId ? 'Save Changes' : 'Create Product'}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">
                    {product.rating} ({product.ratingCount ?? 0})
                  </td>
                  <td className="p-3">
                    {product.status ? 'In stock' : 'Out of stock'}
                  </td>
                  <td className="p-3 flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => openEdit(product)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(String(product._id))}
                    >
                      Delete
                    </Button>
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
