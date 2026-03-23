import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import styles from './Navbar.module.css';

export default function Navbar({ currentPage, onNavigate }) {
  const { lang, setLang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: 'home',      label: t('nav.home') },
    { key: 'test',      label: t('nav.careerTest') },
    { key: 'cv',        label: t('nav.cvBuilder') },
    { key: 'twin',      label: t('nav.careerTwin') },
    { key: 'interview', label: t('nav.interview') },
    { key: 'dashboard', label: t('nav.dashboard') },
  ];

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <button className={styles.logo} onClick={() => { onNavigate('home'); setMobileOpen(false); }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" stroke="#7B4FFF" strokeWidth="1.4" strokeOpacity=".65"/>
          <circle cx="18" cy="18" r="10.5" stroke="#9B6FFF" strokeWidth="1" strokeOpacity=".5"/>
          <circle cx="18" cy="18" r="4" fill="#7B4FFF"/>
          <circle cx="18" cy="18" r="1.8" fill="#C084FC"/>
          <line x1="18" y1="1" x2="18" y2="7.5" stroke="#9B6FFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".8"/>
          <line x1="18" y1="28.5" x2="18" y2="35" stroke="#9B6FFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".8"/>
          <line x1="1" y1="18" x2="7.5" y2="18" stroke="#9B6FFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".8"/>
          <line x1="28.5" y1="18" x2="35" y2="18" stroke="#9B6FFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity=".8"/>
          <path d="M18 18 L27.5 12" stroke="#C084FC" strokeWidth="1.5" strokeOpacity=".9" strokeLinecap="round"/>
          <circle cx="27.5" cy="12" r="2" fill="#C084FC" opacity=".9"/>
        </svg>
        <span className={styles.logoText}>MESBAR <span className={styles.logoAr}>مسبار</span></span>
      </button>

      {/* Desktop Nav Links */}
      <ul className={styles.navLinks}>
        {navItems.map(item => (
          <li key={item.key}>
            <button
              className={`${styles.navLink} ${currentPage === item.key ? styles.navLinkActive : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Controls */}
      <div className={styles.navRight}>
        {/* Language Switcher */}
        <div className={styles.langSwitcher}>
          <button
            className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
            onClick={() => setLang('en')}
          >
            English
          </button>
          <span className={styles.langSep}>|</span>
          <button
            className={`${styles.langBtn} ${lang === 'ar' ? styles.langActive : ''}`}
            onClick={() => setLang('ar')}
          >
            العربية
          </button>
        </div>

        {/* CTA */}
        <button className={styles.cta} onClick={() => onNavigate('dashboard')}>
          {t('nav.launch')}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map(item => (
            <button
              key={item.key}
              className={`${styles.mobileLink} ${currentPage === item.key ? styles.mobileLinkActive : ''}`}
              onClick={() => { onNavigate(item.key); setMobileOpen(false); }}
            >
              {item.label}
            </button>
          ))}
          <div className={styles.mobileLang}>
            <button className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => setLang('en')}>English</button>
            <span className={styles.langSep}>|</span>
            <button className={`${styles.langBtn} ${lang === 'ar' ? styles.langActive : ''}`} onClick={() => setLang('ar')}>العربية</button>
          </div>
          <button className={`${styles.cta} ${styles.ctaMobile}`} onClick={() => { onNavigate('dashboard'); setMobileOpen(false); }}>
            {t('nav.launch')}
          </button>
        </div>
      )}
    </nav>
  );
}
