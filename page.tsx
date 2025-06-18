'use client';
import Image from 'next/image';
import ChatUI from '@/components/ChatUI';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1c2f] text-white flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center mb-6">
        <Image src="/logo.png" alt="Lawverse Logo" width={64} height={64} />
        <h1 className="text-3xl font-bold mt-4">Welcome to Lawverse™</h1>
        <p className="text-sm text-gray-300 mt-2 text-center">AI Legal Assistant. Instantly available. Try the demo below.</p>
      </div>
      <ChatUI />
    </main>
  );
}