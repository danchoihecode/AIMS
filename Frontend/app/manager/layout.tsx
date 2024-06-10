import Header from '@/components/layout/header';
import ManagerSidebar from '@/components/layout/manager-sidebar';
import type { Metadata } from 'next';
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOption } from "@/configs/next-auth-config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Manager Dashboard',
  description: 'Manager dashboard'
};

export default async function ManagerLayout({
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
      <Header />
      <div className="flex h-screen overflow-hidden">
        <ManagerSidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </div>
  );
}
