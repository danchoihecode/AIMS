'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { province } from '@/lib/constant';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  isRushDelivery: boolean;
}

interface DeliveryInfo {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  instructions: string;
  deliveryTime: string;
  province: number;
  rushOrder: boolean;
}

interface OrderDetail {
  allCartProducts: CartProduct[];
  deliveryInfo: DeliveryInfo;
  normalShippingFees: number;
  rushShippingFees: number;
  totalAmount: number;
  state: string;
}

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/manager/order?id=${id}`)
        .then(response => setOrderDetail(response.data))
        .catch(error => console.error("Error fetching order detail:", error));
    }
  }, [id]);

  const handleApproveOrder = () => {
    if (id) {
      axios.get(`http://localhost:8080/manager/approve-order?id=${id}`)
        .then(response => {
          setOrderDetail(response.data);
          toast.success('Order approved successfully!');
        })
        .catch(error => {
          const errorMessage = error.response?.data?.error || 'An error occurred while approving the order.';
          toast.error(errorMessage);
        });
    }
  };

  const handleRejectOrder = () => {
    if (id) {
      axios.get(`http://localhost:8080/manager/reject-order?id=${id}`)
        .then(response => {
          setOrderDetail(response.data);
          toast.success('Order rejected successfully!');
        })
        .catch(error => {
          const errorMessage = error.response?.data?.error || 'An error occurred while rejecting the order.';
          toast.error(errorMessage);
        });
    }
  };

  if (!orderDetail) return <div>Loading...</div>;

  const { allCartProducts, deliveryInfo, normalShippingFees, rushShippingFees, totalAmount, state } = orderDetail;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getProvinceName = (provinceId: number) => {
    const provinceObj = province.find(p => p.id === provinceId.toString());
    return provinceObj ? provinceObj.name : 'Unknown Province';
  };

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        {/* Thông Tin Giao Hàng */}
        <div className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
          <table className="min-w-full bg-white">
            <tbody>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Name:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deliveryInfo.name}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Phone:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deliveryInfo.phone}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Email:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deliveryInfo.email}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Province:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getProvinceName(deliveryInfo.province)}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Address:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deliveryInfo.address}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rush Order:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deliveryInfo.rushOrder ? "Yes" : "No"}</td>
              </tr>
              {deliveryInfo.rushOrder && (
                <>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Instructions:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deliveryInfo.instructions}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delivery Time:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deliveryInfo.deliveryTime}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Danh Sách Sản Phẩm */}
        <div className="mb-4 p-4 border rounded shadow max-h-80 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rush Delivery</th>
              </tr>
            </thead>
            <tbody>
              {allCartProducts.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.imageUrl} alt={product.title} className="w-16 h-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatAmount(product.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.isRushDelivery ? "Supported" : "Not supported"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phí Vận Chuyển và Tổng Số Tiền */}
        <div className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Shipping Fees & Total Amount</h2>
          <table className="min-w-full bg-white">
            <tbody>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Normal Shipping Fees:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatAmount(normalShippingFees)}</td>
              </tr>
              {deliveryInfo.rushOrder && (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rush Shipping Fees:</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatAmount(rushShippingFees)}</td>
                </tr>
              )}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Amount:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatAmount(totalAmount)}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">State:</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{state}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleApproveOrder}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Approve Order
          </button>
          <button
            onClick={handleRejectOrder}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject Order
          </button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default OrderDetail;
