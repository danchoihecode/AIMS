"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area';

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

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/manager/products/${productId}`);
      console.log('Product deleted:', response.data);
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      setError('Error deleting product');
      console.error('Error deleting product', error);
    }
  };
  return (
    <ScrollArea className="h-full">

    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-semibold">Product List</span>
        </Link>
       
        <form className="flex items-center gap-2">
          <Input type="search" placeholder="Search products..." className="w-64" />
          <Link href="/manager/products/create">
    
      <Button variant="outline">
        Add Product
      </Button>
        </Link>
        </form>
      </header>
      

      <main className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 md:p-6 overflow-y-auto"> {/* Thêm overflow-y-auto vào đây */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

          {products.length > 0 ? (
            products.map((product) => (
          <div className="border rounded-lg ">
            <Link href={`products/${product.id}`} passHref>
            <img src={product.image} alt="Product Image" className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-500">{product.price} $</p>
            
            <Link href={`products/${product.id}/edit`} passHref>

              <Button className="mt-2 mr-2" >Change</Button>
            </Link>
            <Button style={{ backgroundColor: '#e53e3e', color: 'white' }} className="mt-2" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>


            </div>
            
          </div>
         
        ))
      ) : (
        <p>No products available.</p>
      )}
          </div>

    </div>
  )}
      </main>

    </div>
    </ScrollArea>

  )
}
