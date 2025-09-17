'use client';

import { useState } from 'react';
import * as React from 'react';
import { StockSearch } from '@/components/StockSearch';
import { StockCard } from '@/components/StockCard';
import { PredictionCard } from '@/components/PredictionCard';
import { useStockData } from '@/hooks/useStockData';
import { usePrediction } from '@/hooks/usePrediction';
import ExplainForm from '@/components/ExplainForm';

export default function Home() {
  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>AI-Driven Apps Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
  <a href="/dodgy-dave" style={{ textDecoration: 'none' }}>
          <div style={{ width: 220, textAlign: 'center', background: '#f7f7f7', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1rem', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
            <img src="/images/dodgy-dave-dog.jpeg" alt="Dodgy Dave the Dog" width={80} height={80} style={{ borderRadius: '1rem', marginBottom: '1rem' }} />
            <h2>Dodgy Dave's Stock Predictions</h2>
            <p style={{ fontSize: '0.95rem', color: '#444' }}>Hilariously unreliable stock market predictions powered by AI.</p>
          </div>
        </a>
        <a href="/artmatch" style={{ textDecoration: 'none' }}>
          <div style={{ width: 220, textAlign: 'center', background: '#f7f7f7', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1rem', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
            <img src="/images/dodgy-dave-dog.jpeg" alt="Dodgy Dave the Dog" width={80} height={80} style={{ borderRadius: '1rem', marginBottom: '1rem' }} />
            <h2>ArtMatch</h2>
            <p style={{ fontSize: '0.95rem', color: '#444' }}>Describe art by famous artists with AI.</p>
          </div>
        </a>
      </div>
      <p style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>More AI-powered apps coming soon!</p>
    </main>
  );
}
