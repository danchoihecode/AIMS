import Header from '@/components/layout/header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import type { Metadata } from 'next';
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOption } from "@/configs/next-auth-config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin panel'
};

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption) as Session;
  if (!session || !session.access_token || !session.admin) {
      redirect("/auth/login");
  }
  return (
    <div>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
<<<<<<< HEAD
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
=======
        <main className="flex-1 overflow-auto pt-16">{children}</main>
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
      </div>
    </div>
  );
}
