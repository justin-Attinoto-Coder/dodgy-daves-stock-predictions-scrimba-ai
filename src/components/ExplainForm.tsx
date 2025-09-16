import React, { useState } from 'react';

const ExplainForm: React.FC = () => {
  const [topic, setTopic] = useState('Quantum Computing');
  const [complexity, setComplexity] = useState('10-year-old');
  const [length, setLength] = useState('short');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setExplanation('');
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, complexity, length }),
      });
      const data = await res.json();
      setExplanation(data.explanation || data.error);
    } catch (err) {
      setExplanation('Error fetching explanation.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Explain Something with OpenAI</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Topic:
          <input value={topic} onChange={e => setTopic(e.target.value)} style={{ width: '100%' }} />
        </label>
        <br /><br />
        <label>
          Complexity:
          <select value={complexity} onChange={e => setComplexity(e.target.value)}>
            <option value="10-year-old">10-year-old</option>
            <option value="college student">College Student</option>
            <option value="PhD">PhD</option>
          </select>
        </label>
        <br /><br />
        <label>
          Length:
          <select value={length} onChange={e => setLength(e.target.value)}>
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>
        </label>
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Explain'}
        </button>
      </form>
      <br />
      {explanation && (
        <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: 6 }}>
          <strong>Explanation:</strong>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ExplainForm;
