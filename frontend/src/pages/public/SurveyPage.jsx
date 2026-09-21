import { useState, useEffect } from 'react';
import { getSettings } from '../../api/public';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScrollReveal from '../../components/common/ScrollReveal';

export default function SurveyPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const settingsRes = await getSettings();
      setSettings(settingsRes.data || {});
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner Header */}
      <ScrollReveal animation="fade-down" delay={0}>
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-slate-200/80 text-center space-y-4 hover-card-lift">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto shadow-soft hover:scale-110 transition-transform">
            <img src="/star-icon.png" alt="Star Icon" className="w-10 h-10 object-contain" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {settings.survey_title || 'Survei Kepuasan Masyarakat (SKM)'}
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {settings.survey_description || 'Bantu kami meningkatkan kualitas, transparansi, dan kecepatan pelayanan publik DTPHKP Kabupaten Kuantan Singingi dengan memberikan penilaian dan ulasan masukan Anda.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={settings.survey_url || 'https://skm.go.id/share/instansi/d1bd6598-706b-4c79-9e8c-0463a3834be0/1'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-soft hover:shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all duration-300 hover-shine-effect"
            >
              <span>Buka Form SKM Resmi KemenPAN-RB (SKM.GO.ID) ↗</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}


