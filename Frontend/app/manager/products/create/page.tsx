"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface Product {
  id: number;
  title: string;
  value: string;
  price: number;
  qtyInStock: number;
  weight: number;
  image: string;
  year: number;
  category: string;
  rushOrderEligible: boolean;
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/manager/products');
      console.log('Response from API:', response);

      const data: Product[] = response.data;

      console.log('Data received from API:', data);

      setProducts(data);
    } catch (error) {
      setError('Error fetching products');
      console.error('Error fetching products', error);
    }
  };

  const handleCreateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn form submit lại trang
  
    const form = event.currentTarget;
    const formData = new FormData(form);
  
    const newProduct: Product = {
      id: 0, // Tạm thời để id là 0, vì id sẽ được server tạo khi thêm mới
      title: formData.get('title') as string,
      value: formData.get('value') as string,
      price: parseFloat(formData.get('price') as string),
      qtyInStock: parseInt(formData.get('qtyInStock') as string),
      weight: parseFloat(formData.get('weight') as string),
      image: formData.get('image') as string,
      year: parseInt(formData.get('year') as string),
      category: formData.get('category') as string,
      rushOrderEligible: formData.get('rushOrderEligible') === 'true'
    };
  
    try {
      const response = await axios.post('http://localhost:8080/manager/products/create', newProduct);
      console.log('Product created:', response.data);
  
      // Sau khi tạo thành công, cập nhật danh sách sản phẩm
      fetchProducts();
    } catch (error) {
      setError('Error creating product');
      console.error('Error creating product', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-full">
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-semibold">Product List</span>
        </Link>
        <form className="flex items-center gap-2">
          <Input type="search" placeholder="Search products..." className="w-64" />
          <Link href="/manager/products/create">
            <Button variant="outline">Add Product</Button>
          </Link>
        </form>
      </header>
      <main className="flex-1 p-4 pt-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
          <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title:</Label>
              <Input type="text" name="title" placeholder="Product title" />
            </div>
            <div>
              <Label>Value:</Label>
              <Input type="text" name="value" placeholder="Product value" />
            </div>
            <div>
              <Label>Price:</Label>
              <Input type="number" name="price" step="0.01" placeholder="Product price" />
            </div>
            <div>
              <Label>Quantity in Stock:</Label>
              <Input type="number" name="qtyInStock" placeholder="Quantity in stock" />
            </div>
            <div>
              <Label>Weight:</Label>
              <Input type="number" name="weight" step="0.01" placeholder="Product weight" />
            </div>
            <div>
              <Label>Image URL:</Label>
              <Input type="text" name="image" placeholder="Image URL" />
            </div>
            <div>
              <Label>Year:</Label>
              <Input type="number" name="year" placeholder="Year" />
            </div>
            <div>
              <Label>Category:</Label>
              <select name="category" className="input">
                <option value="Book">Book</option>
                <option value="CD">CD</option>
                <option value="LP">LP</option>
                <option value="DVD">DVD</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>Rush Order Eligible:</Label>
              <Checkbox name="rushOrderEligible" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Create Product</Button>
            </div>
            {error && <p className="text-red-500 md:col-span-2">{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}
