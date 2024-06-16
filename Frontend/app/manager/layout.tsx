import Header from '@/components/layout/header';
import ManagerSidebar from '@/components/layout/manager-sidebar';
import type { Metadata } from 'next';
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOption } from "@/configs/next-auth-config";
import { redirect } from "next/navigation";
<<<<<<< HEAD
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48

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
  if (!session || !session.access_token || !session.manager) {
<<<<<<< HEAD
    redirect("/auth/login");
=======
      redirect("/auth/login");
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
  }
  return (
    <div>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <ManagerSidebar />
<<<<<<< HEAD
        <main className="flex-1 overflow-hidden pt-16">
          {children}
          <ToastContainer />
        </main>
=======
        <main className="flex-1 overflow-auto pt-16">{children}</main>
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
