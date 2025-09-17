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
      // Directly call OpenAI from browser (dangerouslyAllowBrowser)
      // You must have OpenAI JS SDK loaded and API key available in browser
      // This is for demo purposes only; use API route for production
      // @ts-ignore
      const OpenAI = (await import('openai')).default;
      // @ts-ignore
      const openai = new OpenAI({ dangerouslyAllowBrowser: true });
      const response = await openai.images.generate({
        prompt,
        n: 1,
        size: '256x256',
        response_format: 'b64_json'
      });
      const imgData = response.data[0]?.b64_json ?? null;
      setImage(imgData);
    } catch (error: any) {
      let errorMsg = 'Error generating image';
      if (error?.message) errorMsg += ': ' + error.message;
      if (error?.response?.data) errorMsg += ' ' + JSON.stringify(error.response.data);
      setError(errorMsg);
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <img src="/images/art-match-1.jpg" alt="ArtMatch Example 1" style={{ maxWidth: '100px', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
        <img src="/images/art-match-2.jpg" alt="ArtMatch Example 2" style={{ maxWidth: '100px', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
      </div>
      <Image src="/images/dodgy-dave-dog.jpeg" alt="Dodgy Dave the Dog" width={120} height={120} style={{ display: 'block', margin: '0 auto 1rem', borderRadius: '1rem' }} />
      <h1 style={{ textAlign: 'center' }}>ArtMatch: AI Art Generator</h1>
      <p style={{ textAlign: 'center' }}>Enter a description or prompt and generate an AI image!</p>
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <input
          id="instruction"
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="A 16th-century woman with long brown hair..."
          style={{ width: '80%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc', marginBottom: '1rem' }}
        />
        <br />
        <button
          id="submit-btn"
          onClick={generateImage}
          disabled={loading || !prompt}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      <div id="output-img" style={{ textAlign: 'center', margin: '2rem 0' }}>
        {image && (
          <img src={`data:image/png;base64,${image}`} alt="AI generated art" style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link href="/dodgy-dave"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Back to Dodgy Dave</button></Link>
        <Link href="/"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Home</button></Link>
      </div>
    </main>
  );
}
