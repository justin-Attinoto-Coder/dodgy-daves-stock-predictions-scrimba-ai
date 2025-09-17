"use client";
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtMatchPage() {
  const [prompt, setPrompt] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);

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
      if (!response.ok) {
        let errorText = await response.text();
        if (response.status === 429) {
          setError('AI service rate limit reached. Please wait and try again.');
        } else if (response.status === 503) {
          setError('AI service is currently unavailable. Please try again later.');
        } else if (response.status === 401) {
          setError('AI service authentication failed. Please check your API key.');
        } else {
          setError(`Image generation failed: ${errorText}`);
        }
        setLoading(false);
        return;
      }
      const result = await response.json();
      if (result.image) {
        setImage(result.image);
        // Generate description using prompt
        const descResponse = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const descResult = await descResponse.json();
        setDescription(descResult.explanation || null);
      } else if (result.error) {
        if (result.error.includes('quota') || result.error.includes('token')) {
          setError('AI service quota or token limit reached. Please upgrade your plan or try again later.');
        } else {
          setError(result.error);
        }
      } else {
        setError('Image generation failed.');
      }
    } catch (error: any) {
      let errorMsg = 'Error generating image';
      if (error?.message) errorMsg += ': ' + error.message;
      setError(errorMsg);
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto p-8 rounded-2xl shadow-xl bg-gradient-to-br from-pink-500 via-purple-500 to-red-500 min-h-[80vh]">
      <div className="flex justify-center gap-4 mb-6">
        <img src="/images/art-match-1.jpg" alt="ArtMatch Example 1" className="max-w-[100px] rounded-xl shadow-lg" />
        <img src="/images/art-match-2.jpg" alt="ArtMatch Example 2" className="max-w-[100px] rounded-xl shadow-lg" />
      </div>
      <h1 className="text-3xl font-extrabold text-white text-center mb-8 select-none" style={{ transform: 'rotate(-2deg)' }}>
        <span className="animate-pulse">ArtMatch: AI Art Generator</span>
      </h1>
      <p className="text-center text-white/80 mb-6">Enter a description or prompt and generate an AI image!</p>
      <form onSubmit={e => { e.preventDefault(); generateImage(); }} className="mb-8 flex flex-col gap-4 items-center">
        <input
          id="instruction"
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="A 16th-century woman with long brown hair..."
          className="p-2 rounded-lg border border-gray-300 w-3/4 font-semibold mb-2"
        />
        <button
          id="submit-btn"
          type="submit"
          disabled={loading || !prompt}
          className="p-3 rounded-lg bg-pink-500 text-white font-bold cursor-pointer transition hover:bg-purple-500 animate-pulse mt-2"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      {error && <div className="text-red-300 text-center mb-4 font-semibold">{error}</div>}
      <div id="output-img" className="text-center my-8">
        {image && (
          <img src={`data:image/png;base64,${image}`} alt="AI generated art" className="max-w-full rounded-xl shadow-lg mx-auto" />
        )}
      </div>
      {description && (
        <div className="bg-white/80 p-4 rounded-xl mb-4 font-semibold text-center">
          <h2 className="text-lg font-bold text-purple-500 mb-2" style={{ transform: 'rotate(1deg)' }}>
            <span className="animate-pulse">Description:</span>
          </h2>
          <p className="text-gray-800 font-semibold">{description}</p>
        </div>
      )}
    </main>
  );
}
