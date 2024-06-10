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
  // if (!session || !session.access_token || !session.admin) {
  //     redirect("/auth/login");
  // }
  return (
    <div>
      <Header session={session}/>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </div>
  );
}
