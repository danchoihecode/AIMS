"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Product {
  id: number;
  title: string;
  value: string;
  price: number;
  qtyInStock: number;
  weight: number;
  year: number;
  category: string;
  rushOrderEligible: boolean;
  imageUrl: string;
}

const UpdateProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/manager/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product');
        console.error('Error fetching product:', error);
      }
    };
   
    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct!,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    try {
      const response = await axios.put(`http://localhost:8080/manager/products/${id}`, product);
      console.log('Product updated:', response.data);
      // Optional: Handle success action here if needed
      setSuccessMessage('Product updated successfully!');

      //router.push("/manager/products");

    } catch (error) {
      setError('Error updating product');
      console.error('Error updating product:', error);
    }
  };
  const closeSuccessMessage = () => {
    setSuccessMessage(null);
    router.push("/manager/products");
  };

  if (!product) return <p>Loading product...</p>;

  return (

    
    <ScrollArea className="h-full">

    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">Title:</label>
          <input type="text" id="title" name="title" value={product.title} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="value" className="block font-medium">Value:</label>
          <input type="text" id="value" name="value" value={product.value} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium">Price:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="qtyInStock" className="block font-medium">Quantity in Stock:</label>
          <input type="number" id="qtyInStock" name="qtyInStock" value={product.qtyInStock} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="weight" className="block font-medium">Weight:</label>
          <input type="number" id="weight" name="weight" value={product.weight} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="year" className="block font-medium">Year:</label>
          <input type="number" id="year" name="year" value={product.year} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">Category:</label>
          <input type="text" id="category" name="category" value={product.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" id="rushOrderEligible" name="rushOrderEligible" checked={product.rushOrderEligible} onChange={handleInputChange} className="mr-2" />
            <span className="font-medium">Rush Order Eligible</span>
          </label>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block font-medium">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Update Product</button>
      </form>
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">{successMessage}</p>
            <button onClick={closeSuccessMessage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
    </ScrollArea>


  );
};

export default UpdateProductForm;
