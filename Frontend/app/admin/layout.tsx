import Header from '@/components/layout/header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin panel'
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </div>
  );
}
