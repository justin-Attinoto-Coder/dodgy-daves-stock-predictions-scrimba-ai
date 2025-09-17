
"use client";
import Image from 'next/image';
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
    } catch {
      setError('Error translating');
    }
    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto p-8 rounded-2xl shadow-xl bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 min-h-[80vh]">
  <Image src="/images/polly-glot-1.jpg" alt="Pollyglot Bird" width={120} height={120} className="block mx-auto mb-4 rounded-xl shadow-lg" />
      <h1 className="text-3xl font-extrabold text-white text-center mb-2 select-none" style={{ transform: 'rotate(-2deg)' }}>
        <span className="animate-pulse">Pollyglot Perfect Translation</span>
      </h1>
      <p className="text-center text-white/80 mb-6">Select a language, type your message, and Polly (the bird) will translate it perfectly every time!</p>
      <form onSubmit={handleTranslate} className="mb-8 flex flex-col gap-4 items-center">
        <select value={language} onChange={e => setLanguage(e.target.value)} className="p-2 rounded-lg bg-white/80 text-gray-800 font-semibold mb-2">
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={currentLang?.placeholder || 'how are you?'}
          className="p-2 rounded-lg border border-gray-300 w-3/4 font-semibold"
        />
        <button type="submit" disabled={loading || !input} className="p-3 rounded-lg bg-purple-500 text-white font-bold cursor-pointer transition hover:bg-pink-500 animate-pulse mt-2">
          {loading ? 'Translating...' : 'Send'}
        </button>
      </form>
      {error && <div className="text-red-300 text-center mb-4 font-semibold">{error}</div>}
      {translation && (
        <div className="text-center mb-4 font-semibold bg-white/80 p-4 rounded-xl">
          <span className="text-lg font-bold text-purple-500" style={{ transform: 'rotate(1deg)' }}>
            <span className="animate-pulse">Translation:</span>
          </span>
          <span className="ml-4 text-pink-500">{translation}</span>
        </div>
      )}
      {image && (
        <div className="text-center my-8">
          <Image src={`data:image/png;base64,${image}`} alt="AI generated art" width={256} height={256} className="max-w-full rounded-xl shadow-lg" />
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white text-center mb-4" style={{ transform: 'rotate(-1deg)' }}>
          <span className="animate-pulse">Chat History</span>
        </h2>
        <div className="bg-white/80 rounded-xl p-4 min-h-[80px]">
          {chat.length === 0 ? <p className="text-gray-400 text-center">No messages yet.</p> : (
            chat.map((msg, idx) => (
              <div key={idx} className="mb-4 text-left">
                <div className="font-bold text-purple-500">You: <span className="text-gray-800">{msg.text}</span></div>
                <div className="text-pink-500">Pollyglot ({LANGUAGES.find(l => l.code === msg.lang)?.name}): <span>{msg.translation}</span></div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="text-center mt-8 flex justify-center gap-4">
        <Link href="/">
          <button className="p-2 px-6 rounded-lg bg-white/80 text-purple-500 font-bold cursor-pointer transition hover:bg-pink-100">Home</button>
        </Link>
      </div>
    </main>
  );
}
