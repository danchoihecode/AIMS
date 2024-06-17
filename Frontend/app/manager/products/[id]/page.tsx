// app/products/[id]/page.tsx

import React from 'react';
import styles from './ProductPage.module.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    // Sử dụng HTTP thay vì HTTPS nếu server của bạn không hỗ trợ HTTPS trên localhost
    const res = await fetch('http://localhost:8080/manager/products');

    // Kiểm tra xem response có thành công không
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const products: Product[] = await res.json();

    // Map the products to an array of parameters
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  try {
    // Fetch the product data based on the ID
    const res = await fetch(`http://localhost:8080/manager/products/${id}`);

    // Kiểm tra xem response có thành công không
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const product: Product = await res.json();

    // Return the product details
    return (
      /*<div className="flex flex-col min-h-screen">
         <header className="flex items-center justify-between px-4 py-2 border-b">
          <span className="text-lg font-semibold">{product.title}</span>
       
        </header>        
      <div className={styles.header}>
          <h1></h1>
        </div>
        <img className={styles.image} src={product.image} alt={product.title} />
        <div className={styles.details}>
          <p >Value: {product.value}</p>
          <p >Price: ${product.price}</p>
          <p >Quantity in stock: {product.qtyInStock}</p>
          <p >Weight: {product.weight} kg</p>
          <p >Year: {product.year}</p>
          <p  >Category: {product.category}</p>
          <p>
            Rush order eligible: {product.rushOrderEligible ? 'Yes' : 'No'}
          </p>
        </div>
      </div>*/
  
     <Card>
     <CardHeader>
       <CardTitle>{product.title}</CardTitle>
       <CardDescription>Card Description</CardDescription>
     </CardHeader>
     <CardContent>
     <img className="w-64 h-64 object-cover mt-4"  src={product.image} alt={product.title} />
      
     <p >Value: {product.value}</p>
          <p >Price: ${product.price}</p>
          <p >Quantity in stock: {product.qtyInStock}</p>
          <p >Weight: {product.weight} kg</p>
          <p >Year: {product.year}</p>
          <p  >Category: {product.category}</p>
          <p>
            Rush order eligible: {product.rushOrderEligible ? 'Yes' : 'No'}
          </p>
     </CardContent>
     <CardFooter>
       
     </CardFooter>
   </Card>
   
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
