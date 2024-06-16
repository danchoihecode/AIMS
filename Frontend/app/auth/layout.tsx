import type { Metadata } from 'next';
<<<<<<< HEAD
=======
import { SessionProvider } from '@/context/SessionContext';
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48

export const metadata: Metadata = {
  title: 'Auth Panel',
  description: 'Auth panel'
};

<<<<<<< HEAD
export default async function AuthLayout({
=======
export default function AuthLayout({
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
  children
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex items-center justify-center pt-16">
        {children}
      </main>
    </div>
  );
}
=======
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
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
