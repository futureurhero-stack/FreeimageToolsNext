"use client";

import { useState } from "react";
import Source from "../../components/variations/source";
import Design1 from "../../components/variations/design1";
import Design2 from "../../components/variations/design2";
import Design3 from "../../components/variations/design3";

export default function VariationsPage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'en';
    }
    return 'en';
  });

  const texts = {
    ko: {
      title: "디자인 변형 비교",
      subtitle: "FreeImageTools - 시각적 디자인 변형",
      original: "원본 디자인",
      design1: "변형 1: 미니멀 모던",
      design1Desc: "깔끔하고 여유로운 공간의 미니멀 디자인",
      design2: "변형 2: 다크 프로페셔널",
      design2Desc: "프리미엄 다크 테마와 글로우 효과",
      design3: "변형 3: 활기찬 그라데이션",
      design3Desc: "대담한 그라데이션을 활용한 역동적인 디자인"
    },
    en: {
      title: "Design Variations Comparison",
      subtitle: "FreeImageTools - Visual Design Variations",
      original: "Original Design",
      design1: "Variation 1: Minimal Modern",
      design1Desc: "Clean, spacious design with subtle accents",
      design2: "Variation 2: Dark Professional",
      design2Desc: "Premium dark theme with glowing accents",
      design3: "Variation 3: Vibrant Gradient",
      design3Desc: "Energetic design with bold gradients"
    }
  };

  const t = texts[lang];

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'var(--bg-base)',
      minHeight: '100vh',
      color: 'var(--text-primary)'
    }}>
      <header style={{ 
        padding: '2rem', 
        textAlign: 'center',
        marginBottom: '4rem',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          {t.title}
        </h1>
        <p style={{ 
          fontSize: '1.125rem',
          color: 'var(--text-secondary)'
        }}>
          {t.subtitle}
        </p>
      </header>

      <section style={{ 
        marginBottom: '6rem',
        padding: '2rem',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border-default)'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 700,
          marginBottom: '1rem',
          color: 'var(--text-primary)'
        }}>
          {t.original}
        </h2>
        <Source />
      </section>

      <section style={{ 
        marginBottom: '6rem',
        padding: '2rem',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border-default)'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          {t.design1}
        </h2>
        <p style={{ 
          marginBottom: '2rem', 
          color: 'var(--text-secondary)',
          fontSize: '1rem'
        }}>
          {t.design1Desc}
        </p>
        <Design1 />
      </section>

      <section style={{ 
        marginBottom: '6rem',
        padding: '2rem',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border-default)'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          {t.design2}
        </h2>
        <p style={{ 
          marginBottom: '2rem', 
          color: 'var(--text-secondary)',
          fontSize: '1rem'
        }}>
          {t.design2Desc}
        </p>
        <Design2 />
      </section>

      <section style={{ 
        marginBottom: '6rem',
        padding: '2rem',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border-default)'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          {t.design3}
        </h2>
        <p style={{ 
          marginBottom: '2rem', 
          color: 'var(--text-secondary)',
          fontSize: '1rem'
        }}>
          {t.design3Desc}
        </p>
        <Design3 />
      </section>
    </div>
  );
}

