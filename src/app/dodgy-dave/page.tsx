
"use client";
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DodgyDavePage() {
  const [tickersArr, setTickersArr] = React.useState<string[]>([]);
  const [tickerInput, setTickerInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [apiMessage, setApiMessage] = React.useState('');
  const [report, setReport] = React.useState('');
  const [error, setError] = React.useState('');
  const polygonApiKey = (typeof window !== 'undefined' && (window as any).POLYGON_API_KEY) || '';

  const handleTickerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tickerInput.length > 2) {
      setTickersArr([...tickersArr, tickerInput.toUpperCase()]);
      setTickerInput('');
      setError('');
    } else {
      setError('You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.');
    }
  };

  const renderTickers = () => (
    <div className="ticker-choice-display" style={{ margin: '1rem 0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {tickersArr.map((ticker, idx) => (
        <span key={idx} className="ticker" style={{ background: '#eee', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontWeight: 600 }}>{ticker}</span>
      ))}
    </div>
  );

  async function fetchStockData() {
    setLoading(true);
    setApiMessage('');
    setReport('');
    setError('');
    try {
      const dates = await import('@/utils/data').then(mod => mod.dates);
      const stockData = await Promise.all(tickersArr.map(async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${polygonApiKey}`;
        const response = await fetch(url);
        const data = await response.text();
        const status = response.status;
        if (status === 200) {
          setApiMessage('Creating report...');
          return data;
        } else {
          setError('There was an error fetching stock data.');
        }
      }));
      fetchReport(stockData.join(''));
    } catch (err) {
      setError('There was an error fetching stock data.');
      console.error('error: ', err);
    }
    setLoading(false);
  }

  async function fetchReport(data: string) {
    const messages = [
      {
        role: 'system',
        content: 'You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell. Use the examples provided between ### to set the style your response.'
      },
      {
        role: 'user',
        content: `${data}
            ###
            OK baby, hold on tight! You are going to haate this! Over the past three days, Tesla (TSLA) shares have plummetted. The stock opened at $223.98 and closed at $202.11 on the third day, with some jumping around in the meantime. This is a great time to buy, baby! But not a great time to sell! But I'm not done! Apple (AAPL) stocks have gone stratospheric! This is a seriously hot stock right now. They opened at $166.38 and closed at $182.89 on day three. So all in all, I would hold on to Tesla shares tight if you already have them - they might bounce right back up and head to the stars! They are volatile stock, so expect the unexpected. For APPL stock, how much do you need the money? Sell now and take the profits or hang on and wait for more! If it were me, I would hang on because this stock is on fire right now!!! Apple are throwing a Wall Street party and y'all invited!
            ###
            Apple (AAPL) is the supernova in the stock sky – it shot up from $150.22 to a jaw-dropping $175.36 by the close of day three. We’re talking about a stock that’s hotter than a pepper sprout in a chilli cook-off, and it’s showing no signs of cooling down! If you’re sitting on AAPL stock, you might as well be sitting on the throne of Midas. Hold on to it, ride that rocket, and watch the fireworks, because this baby is just getting warmed up! Then there’s Meta (META), the heartthrob with a penchant for drama. It winked at us with an opening of $142.50, but by the end of the thrill ride, it was at $135.90, leaving us a little lovesick. It’s the wild horse of the stock corral, bucking and kicking, ready for a comeback. META is not for the weak-kneed So, sugar, what’s it going to be? For AAPL, my advice is to stay on that gravy train. As for META, keep your spurs on and be ready for the rally.
            ###`
      }
    ];
    try {
      // Use your API route for OpenAI calls
      const response = await fetch('/api/prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockData: JSON.stringify(messages) })
      });
      const result = await response.json();
      setReport(result.report || result.error || 'No report generated');
    } catch (err) {
      setError('Unable to access AI. Please refresh and try again');
      console.error('Error:', err);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <Image src="/images/dodgy-dave-dog.jpeg" alt="Dodgy Dave the Dog" width={120} height={120} style={{ display: 'block', margin: '0 auto 1rem', borderRadius: '1rem' }} />
      <h1 style={{ textAlign: 'center' }}>Dodgy Dave's Stock Predictions</h1>
      <p style={{ textAlign: 'center' }}>Hilariously unreliable stock market predictions powered by AI - for entertainment purposes only!</p>
      <form id="ticker-input-form" onSubmit={handleTickerSubmit} style={{ margin: '2rem 0', textAlign: 'center' }}>
        <input
          id="ticker-input"
          type="text"
          value={tickerInput}
          onChange={e => setTickerInput(e.target.value)}
          placeholder="Enter stock ticker (e.g. TSLA)"
          style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #ccc', marginRight: '1rem', width: '60%' }}
        />
        <button
          type="submit"
          className="generate-report-btn"
          disabled={tickerInput.length < 3}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#4f46e5', color: '#fff', border: 'none', cursor: tickerInput.length < 3 ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >Add Ticker</button>
      </form>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      {renderTickers()}
      <div className="action-panel" style={{ textAlign: 'center', margin: '2rem 0' }}>
        <button
          onClick={fetchStockData}
          className="generate-report-btn"
          disabled={tickersArr.length === 0 || loading}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#22c55e', color: '#fff', border: 'none', cursor: tickersArr.length === 0 || loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >{loading ? 'Loading...' : 'Generate Report'}</button>
      </div>
      <div className="loading-panel" style={{ display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', minHeight: '60px', color: '#555', fontWeight: 600 }}>
        {apiMessage || 'Loading...'}
      </div>
      <div id="api-message" style={{ textAlign: 'center', margin: '1rem 0', color: '#555', fontWeight: 600 }}>{apiMessage}</div>
      <div className="output-panel" style={{ display: report ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
        <p style={{ background: '#f7f7f7', padding: '1rem', borderRadius: '1rem', maxWidth: '100%', fontSize: '1.1rem' }}>{report}</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link href="/artmatch"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Go to ArtMatch</button></Link>
        <Link href="/"><button style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}>Home</button></Link>
      </div>
    </main>
  );
}
