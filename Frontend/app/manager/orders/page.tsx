'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from "react"
import { OrderDTO } from "@/api/DTO/OrderDTO"
import { getOrders } from "@/api/DTO/apifunc"

export default function Orders() {
  const [orders, setOrders] = useState<OrderDTO[]>([])

  useEffect(() => {
    getOrders().then((data) => {
      if (data) setOrders(data)
    })
  }, [])

  return (
    <ScrollArea className="h-full">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/manager">Manager</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/manager/orders">Orders</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <OrderTable orders={orders} />
        </div>
      </div>
    </ScrollArea>  
  )
}

function OrderTable({ orders }: { orders: OrderDTO[] }) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage your orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Action</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{formatAmount(order.amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{order.state}</Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/manager/order?id=${order.id}`} className="inline-block px-3 py-1 bg-black text-white text-sm rounded transition duration-300 hover:shadow-lg">
                    View order detail
                  </Link> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{orders.length}</strong> of <strong>{orders.length}</strong> Orders
        </div>
      </CardFooter>
    </Card>
  )
}
