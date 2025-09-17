"use client";
import * as React from 'react';
import Link from 'next/link';

const LANGUAGES = [
  { code: 'fr', name: 'French', placeholder: 'comment allez-vous?' },
  { code: 'es', name: 'Spanish', placeholder: '¿Cómo estás?' },
  { code: 'de', name: 'German', placeholder: 'Wie geht es Ihnen?' },
  { code: 'it', name: 'Italian', placeholder: 'Come stai?' },
  { code: 'zh', name: 'Chinese', placeholder: '你好吗？' },
  { code: 'ja', name: 'Japanese', placeholder: 'お元気ですか？' },
];

export default function PollyglotPage() {
  const [input, setInput] = React.useState('how are you?');
  const [language, setLanguage] = React.useState(LANGUAGES[0].code);
  const [translation, setTranslation] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [chat, setChat] = React.useState<Array<{text:string,translation:string,lang:string}>>([]);
  const [image, setImage] = React.useState<string|null>(null);

  const currentLang = LANGUAGES.find(l => l.code === language);

  async function handleTranslate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTranslation('');
    setImage(null);
    try {
      // Call API route for translation
      const response = await fetch('/api/pollyglot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, language })
      });
      const result = await response.json();
      if (result.translation) {
        setTranslation(result.translation);
        setChat([...chat, { text: input, translation: result.translation, lang: language }]);
        // Optionally generate image
        if (result.image) setImage(result.image);
      } else {
        setError(result.error || 'Translation failed');
      }
    } catch (err) {
      setError('Error translating');
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <img src="/images/polly-glot-1.jpg" alt="Pollyglot Bird" style={{ display: 'block', margin: '0 auto 1rem', maxWidth: '120px', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
      <h1 style={{ textAlign: 'center' }}>Pollyglot Perfect Translation</h1>
      <p style={{ textAlign: 'center' }}>Select a language, type your message, and Polly (the bird) will translate it perfectly every time!</p>
      <form onSubmit={handleTranslate} style={{ margin: '2rem 0', textAlign: 'center' }}>
        <select value={language} onChange={e => setLanguage(e.target.value)} style={{ padding: '0.5rem', borderRadius: '0.5rem', marginRight: '1rem' }}>
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="how are you?"
          style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #ccc', width: '60%' }}
        />
        <button type="submit" disabled={loading || !input} style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, marginLeft: '1rem' }}>
          {loading ? 'Translating...' : 'Send'}
        </button>
      </form>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      {translation && (
        <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 600 }}>
          <span>Translation:</span>
          <span style={{ marginLeft: '1rem', color: '#4f46e5' }}>{translation}</span>
        </div>
      )}
      {image && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <img src={`data:image/png;base64,${image}`} alt="AI generated art" style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ textAlign: 'center' }}>Chat History</h2>
        <div style={{ background: '#f7f7f7', borderRadius: '1rem', padding: '1rem', minHeight: '80px' }}>
          {chat.length === 0 ? <p style={{ color: '#888', textAlign: 'center' }}>No messages yet.</p> : (
            chat.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>You: <span style={{ color: '#222' }}>{msg.text}</span></div>
                <div style={{ color: '#4f46e5' }}>Pollyglot ({LANGUAGES.find(l => l.code === msg.lang)?.name}): <span>{msg.translation}</span></div>
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link href="/"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Home</button></Link>
      </div>
    </main>
  );
}
