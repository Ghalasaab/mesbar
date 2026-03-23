'use client';
import { useState } from 'react';
import { useLangStore } from '@/lib/store';
import { t } from '@/lib/translations';

interface NavbarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

export default function Navbar({ activeView, onNavigate }: NavbarProps) {
  const { lang, setLang } = useLangStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = (view: string) => { onNavigate?.(view); setMobileOpen(false); };

  return (
    <nav style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 40px',borderBottom:'1px solid var(--border)',background:'rgba(11,6,24,0.88)',backdropFilter:'blur(20px)',position:'sticky',top:0,zIndex:200,gap:16,flexWrap:'wrap' }}>
      <button onClick={() => nav('home')} style={{ display:'flex',alignItems:'center',gap:10,fontFamily:'var(--font-display)',fontWeight:800,fontSize:20,letterSpacing:'-0.5px',background:'none',border:'none',color:'var(--text)',cursor:'pointer',flexShrink:0 }}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="16" stroke="#7B4FFF" strokeWidth="1.4" strokeOpacity=".6"/>
          <circle cx="17" cy="17" r="10" stroke="#9B6FFF" strokeWidth="1" strokeOpacity=".5"/>
          <circle cx="17" cy="17" r="3.5" fill="#7B4FFF"/>
          <circle cx="17" cy="17" r="1.5" fill="#C084FC"/>
          <line x1="17" y1="1" x2="17" y2="6" stroke="#9B6FFF" strokeWidth="1.4" strokeOpacity=".8"/>
          <line x1="17" y1="28" x2="17" y2="33" stroke="#9B6FFF" strokeWidth="1.4" strokeOpacity=".8"/>
          <line x1="1" y1="17" x2="6" y2="17" stroke="#9B6FFF" strokeWidth="1.4" strokeOpacity=".8"/>
          <line x1="28" y1="17" x2="33" y2="17" stroke="#9B6FFF" strokeWidth="1.4" strokeOpacity=".8"/>
          <path d="M17 17 L26 11" stroke="#C084FC" strokeWidth="1.4" strokeOpacity=".9" strokeLinecap="round"/>
          <circle cx="26" cy="11" r="1.8" fill="#C084FC" opacity=".9"/>
        </svg>
        <span>MESBAR</span>
        <span style={{ color:'var(--neon)',fontFamily:'var(--font-ar)',fontSize:16 }}>مسبار</span>
      </button>

      <ul style={{ display:'flex',gap:24,listStyle:'none',margin:0,padding:0 }} className="nav-links-desktop">
        {[{key:'home',label:lang==='ar'?'الرئيسية':'Home'},{key:'test',label:lang==='ar'?'اختبار المسار':'Career Test'},{key:'dashboard',label:lang==='ar'?'لوحة التحكم':'Dashboard'},{key:'cv',label:lang==='ar'?'السيرة الذاتية':'CV Builder'}].map(item => (
          <li key={item.key}>
            <button onClick={() => nav(item.key)} style={{ background:'none',border:'none',cursor:'pointer',color:activeView===item.key?'var(--text)':'var(--dim)',fontSize:13,fontWeight:500,fontFamily:'inherit',transition:'color .2s',padding:'4px 0',borderBottom:activeView===item.key?'1px solid var(--pb)':'1px solid transparent' }}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display:'flex',alignItems:'center',gap:10,flexShrink:0 }}>
        <div style={{ display:'flex',alignItems:'center',gap:4 }}>
          <button onClick={() => setLang('en')} style={{ background:lang==='en'?'var(--pd)':'transparent',border:`1px solid ${lang==='en'?'var(--border-b)':'transparent'}`,color:lang==='en'?'var(--neon)':'var(--muted)',borderRadius:6,padding:'5px 10px',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'inherit',transition:'all .2s' }}>EN</button>
          <span style={{ color:'var(--muted)',fontSize:11 }}>|</span>
          <button onClick={() => setLang('ar')} style={{ background:lang==='ar'?'var(--pd)':'transparent',border:`1px solid ${lang==='ar'?'var(--border-b)':'transparent'}`,color:lang==='ar'?'var(--neon)':'var(--muted)',borderRadius:6,padding:'5px 10px',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:lang==='ar'?'var(--font-ar)':'inherit',transition:'all .2s' }}>العربية</button>
        </div>
        <button className="btn-primary" onClick={() => nav('test')} style={{ padding:'9px 18px',fontSize:13,boxShadow:'var(--glow-sm)' }}>
          {lang==='ar'?'ابدأ الآن':'Get Started'}
        </button>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display:'none',background:'none',border:'1px solid var(--border-b)',borderRadius:8,padding:'7px 11px',color:'var(--text)',cursor:'pointer',fontSize:16 }} className="nav-hamburger">
          {mobileOpen?'✕':'☰'}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ width:'100%',background:'var(--card)',borderRadius:12,border:'1px solid var(--border)',padding:16,display:'flex',flexDirection:'column',gap:8 }}>
          {[{key:'home',label:lang==='ar'?'الرئيسية':'Home'},{key:'test',label:lang==='ar'?'اختبار المسار':'Career Test'},{key:'dashboard',label:lang==='ar'?'لوحة التحكم':'Dashboard'},{key:'cv',label:lang==='ar'?'السيرة الذاتية':'CV Builder'},{key:'twin',label:lang==='ar'?'التوأم المهني':'Career Twin'},{key:'interview',label:lang==='ar'?'مقابلة وهمية':'Mock Interview'}].map(item => (
            <button key={item.key} onClick={() => nav(item.key)} style={{ background:'none',border:'none',cursor:'pointer',color:activeView===item.key?'var(--neon)':'var(--dim)',fontSize:14,fontWeight:500,fontFamily:'inherit',textAlign:lang==='ar'?'right':'left',padding:'8px 4px' }}>{item.label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .nav-links-desktop { display: none !important; } .nav-hamburger { display: block !important; } }
        @media (min-width: 901px) { .nav-hamburger { display: none !important; } }
      `}</style>
    </nav>
  );
}
