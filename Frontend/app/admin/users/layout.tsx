import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Users panel'
};

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
