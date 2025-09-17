import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ width: '100%', background: '#f7f7f7', padding: '1rem 0', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <Link href="/" style={{ fontWeight: 600, color: '#222', textDecoration: 'none' }}>Home</Link>
        <Link href="/dodgy-dave" style={{ fontWeight: 600, color: '#222', textDecoration: 'none' }}>Dodgy Dave</Link>
        <Link href="/artmatch" style={{ fontWeight: 600, color: '#222', textDecoration: 'none' }}>ArtMatch</Link>
      </nav>
    </header>
  );
}
