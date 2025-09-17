import Image from 'next/image';
import * as React from 'react';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-8 rounded-2xl shadow-xl bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 min-h-[80vh]">
      <h1 className="text-4xl font-extrabold text-white text-center mb-10 select-none" style={{ transform: 'rotate(-2deg)' }}>
        <span className="animate-pulse">AI-Driven Apps Dashboard</span>
      </h1>
      <div className="flex justify-center gap-8 flex-wrap">
        <a href="/dodgy-dave" className="no-underline">
          <div className="w-56 text-center bg-white/80 rounded-xl shadow-lg p-4 cursor-pointer transition hover:shadow-2xl">
            <Image src="/images/dodgy-dave-dog.jpeg" alt="Dodgy Dave the Dog" width={80} height={80} className="rounded-xl mb-4 mx-auto" />
            <h2 className="text-xl font-bold text-red-500 mb-1" style={{ transform: 'rotate(2deg)' }}>
              <span className="animate-pulse">Dodgy Dave&apos;s Stock Predictions</span>
            </h2>
            <p className="text-sm text-gray-700">Hilariously unreliable stock market predictions powered by AI.</p>
          </div>
        </a>
        <a href="/artmatch" className="no-underline">
          <div className="w-56 text-center bg-white/80 rounded-xl shadow-lg p-4 cursor-pointer transition hover:shadow-2xl">
            <Image src="/images/art-match-1.jpg" alt="ArtMatch Example 1" width={80} height={80} className="rounded-xl mb-2 mx-auto shadow-md" />
            <Image src="/images/art-match-2.jpg" alt="ArtMatch Example 2" width={80} height={80} className="rounded-xl mb-4 mx-auto shadow-md" />
            <h2 className="text-xl font-bold text-pink-500 mb-1" style={{ transform: 'rotate(-3deg)' }}>
              <span className="animate-pulse">ArtMatch</span>
            </h2>
            <p className="text-sm text-gray-700">Describe art by famous artists with AI.</p>
          </div>
        </a>
        <a href="/pollyglot" className="no-underline">
          <div className="w-56 text-center bg-white/80 rounded-xl shadow-lg p-4 cursor-pointer transition hover:shadow-2xl">
            <Image src="/images/polly-glot-1.jpg" alt="Pollyglot Bird" width={80} height={80} className="rounded-xl mb-4 mx-auto shadow-md" />
            <h2 className="text-xl font-bold text-purple-500 mb-1" style={{ transform: 'rotate(1deg)' }}>
              <span className="animate-pulse">Pollyglot</span>
            </h2>
            <p className="text-sm text-gray-700">Perfect translation every time, powered by AI.</p>
          </div>
        </a>
      </div>
      <p className="text-center mt-10 text-white/80">More AI-powered apps coming soon!</p>
    </main>
  );
}
