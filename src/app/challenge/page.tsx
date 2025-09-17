import Image from 'next/image';
import Link from 'next/link';

export default function ChallengePage() {
  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <Image src="/images/dodgy-dave-dog.jpeg" alt="Dodgy Dave the Dog" width={120} height={120} style={{ display: 'block', margin: '0 auto 1rem', borderRadius: '1rem' }} />
      <h1 style={{ textAlign: 'center' }}>Dodgy Dave's Stock Predictions</h1>
      <p style={{ textAlign: 'center' }}>Hilariously unreliable stock market predictions powered by AI - for entertainment purposes only!</p>
      {/* The rest of your challenge UI will be rendered here by index.ts */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/artmatch"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Go to ArtMatch</button></Link>
      </div>
    </main>
  );
}
