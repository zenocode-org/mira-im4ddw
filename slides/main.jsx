import React from 'react';
import { createRoot } from 'react-dom/client';
import PresentationModule from './seance-01/presentation-module.jsx';
import CoursHtmlCss from './seance-01/cours-html-css.jsx';
import CoursJavascriptTheorique from './seance-03/cours-javascript-theorique.jsx';
import CoursPhpTheorique from './seance-06/cours-php-theorique.jsx';

const SESSIONS = [
  {
    id: 'seance-01',
    title: 'Séance 1',
    date: '3 mars 2025',
    decks: [
      { key: 'seance-01-module', title: 'Présentation du Module', component: PresentationModule },
      { key: 'seance-01-html-css', title: 'Cours HTML/CSS', component: CoursHtmlCss },
    ],
  },
  {
    id: 'seance-03',
    title: 'Séance 3',
    date: '17 mars 2025',
    decks: [
      {
        key: 'seance-03-javascript-theorique',
        title: 'Cours JavaScript Théorique',
        component: CoursJavascriptTheorique,
      },
    ],
  },
  {
    id: 'seance-06',
    title: 'Séance 6',
    date: '14 avril 2026',
    decks: [
      {
        key: 'seance-06-php-theorique',
        title: 'Cours PHP théorique',
        component: CoursPhpTheorique,
      },
    ],
  },
];

// Flat lookup for routing
const DECKS = Object.fromEntries(
  SESSIONS.flatMap((s) => s.decks.map((d) => [d.key, d]))
);

function DeckSelector() {
  const params = new URLSearchParams(window.location.search);
  const deckKey = params.get('deck') || '';

  if (deckKey && DECKS[deckKey]) {
    const { component: Component } = DECKS[deckKey];
    return <Component />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc',
        fontFamily: 'system-ui, sans-serif',
        padding: 24,
      }}
    >
      <h1 style={{ color: '#00a3a3', marginBottom: 8 }}>MIRA</h1>
      <p style={{ color: '#4a5568', marginBottom: 32 }}>
        Choisis un deck de présentation
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%', maxWidth: 480 }}>
        {SESSIONS.map((session) => (
          <section key={session.id}>
            <h2
              style={{
                color: '#2d3748',
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {session.title}
            </h2>
            <p
              style={{
                color: '#718096',
                fontSize: 14,
                marginBottom: 12,
              }}
            >
              {session.date}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {session.decks.map(({ key, title }) => (
                <a
                  key={key}
                  href={`?deck=${key}`}
                  style={{
                    padding: '12px 20px',
                    background: '#00a3a3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {title}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<DeckSelector />);
