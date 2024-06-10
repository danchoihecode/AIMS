import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth Panel',
  description: 'Auth panel'
};

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex items-center justify-center pt-16">
        {children}
      </main>
    </div>
  );
}
