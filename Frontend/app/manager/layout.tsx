import Header from '@/components/layout/header';
import ManagerSidebar from '@/components/layout/manager-sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manager Dashboard',
  description: 'Manager dashboard'
};

export default function ManagerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <ManagerSidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  );
}
