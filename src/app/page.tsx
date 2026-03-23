'use client';
// src/app/page.tsx
import { useEffect } from 'react';
import { useLangStore, useDashboardStore, useCareerTestStore } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Homepage from '@/components/layout/Homepage';
import Dashboard from '@/components/dashboard/Dashboard';
import CareerTest from '@/components/tools/CareerTest';
import CareerTestResult from '@/components/tools/CareerTestResult';
import CvBuilder from '@/components/tools/CvBuilder';
import CareerTwin from '@/components/tools/CareerTwin';
import MockInterview from '@/components/tools/MockInterview';

export default function MesbarApp() {
  const { lang } = useLangStore();
  const { activeView, setView } = useDashboardStore();
  const { result: testResult } = useCareerTestStore();

  // Apply RTL to <html> when Arabic is active
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (lang === 'ar') {
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
      body.classList.add('ar');
    } else {
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
      body.classList.remove('ar');
    }
  }, [lang]);

  const handleNavigate = (view: string) => {
    setView(view as typeof activeView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestResult = () => {
    setView('result');
  };

  const handleRetakeTest = () => {
    setView('test');
  };

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      {/* HOME */}
      {activeView === 'home' && (
        <div className="animate-fade-in">
          <Homepage onNavigate={handleNavigate} />
        </div>
      )}

      {/* CAREER TEST */}
      {activeView === 'test' && (
        <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
          <CareerTest onResult={handleTestResult} />
        </div>
      )}

      {/* CAREER TEST RESULT */}
      {activeView === 'result' && (
        <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
          {testResult ? (
            <CareerTestResult
              onDashboard={() => handleNavigate('dashboard')}
              onRetake={handleRetakeTest}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--dim)', marginBottom: 20 }}>
                {lang === 'ar' ? 'لا توجد نتائج بعد — أكمل الاختبار أولاً' : 'No results yet — complete the test first'}
              </p>
              <button className="btn-primary" onClick={() => handleNavigate('test')}>
                {lang === 'ar' ? 'ابدأ الاختبار' : 'Start Test'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD */}
      {activeView === 'dashboard' && (
        <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
          <Dashboard onNavigate={handleNavigate} />
        </div>
      )}

      {/* CV BUILDER */}
      {activeView === 'cv' && (
        <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
          <CvBuilder />
        </div>
      )}

      {/* CAREER TWIN */}
      {activeView === 'twin' && (
        <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
          <CareerTwin />
        </div>
      )}

      {/* MOCK INTERVIEW */}
      {activeView === 'interview' && (
        <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
          <MockInterview />
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .main-pad { padding: 40px 20px !important; }
        }
        @media (max-width: 540px) {
          .main-pad { padding: 28px 16px !important; }
        }
      `}</style>
    </main>
  );
}
