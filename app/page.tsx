'use client';

import ChatUI from '@/components/ChatUI'; // Use relative path to test, safe method

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome to Lawverse™</h1>
      <ChatUI />
    </main>
  );
}
