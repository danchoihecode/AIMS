import type { Metadata } from 'next';
import { SessionProvider } from '@/context/SessionContext';

export const metadata: Metadata = {
  title: 'Auth Panel',
  description: 'Auth panel'
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex items-center justify-center pt-16">
        <SessionProvider>
          {children}
        </SessionProvider>
      </main>
    </div>
  
  );
}
