"use client";
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtMatchPage() {
  const [prompt, setPrompt] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function generateImage() {
    setLoading(true);
    setError(null);
    setImage(null);
    try {
      const response = await fetch('/api/artmatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const result = await response.json();
      if (result.image) {
        setImage(result.image);
      } else {
        setError(result.error || 'No image returned');
      }
    } catch (err) {
      setError('Error generating image');
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <Image src="/images/dodgy-dave-dog.jpeg" alt="Dodgy Dave the Dog" width={120} height={120} style={{ display: 'block', margin: '0 auto 1rem', borderRadius: '1rem' }} />
      <h1 style={{ textAlign: 'center' }}>ArtMatch: Describe Art by Famous Artists</h1>
      <p style={{ textAlign: 'center' }}>Enter a description or prompt and generate an AI image!</p>
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="A 16th-century woman with long brown hair..."
          style={{ width: '80%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc', marginBottom: '1rem' }}
        />
        <br />
        <button
          onClick={generateImage}
          disabled={loading || !prompt}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      {image && (
        <div id="output-img" style={{ textAlign: 'center', margin: '2rem 0' }}>
          <img src={`data:image/png;base64,${image}`} alt="AI generated art" style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link href="/dodgy-dave"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Back to Dodgy Dave</button></Link>
        <Link href="/"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Home</button></Link>
      </div>
    </main>
  );
}
