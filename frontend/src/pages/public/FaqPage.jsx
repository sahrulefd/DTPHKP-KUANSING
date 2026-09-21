import { useState, useEffect } from 'react';
import { getFaqs } from '../../api/public';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScrollReveal from '../../components/common/ScrollReveal';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const data = await getFaqs();
      setFaqs(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <ScrollReveal animation="fade-down" delay={0}>
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-100 px-3 py-1 rounded-full inline-block hover:scale-105 transition-transform">
            FAQ
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900">Pertanyaan Yang Sering Diajukan</h1>
          <p className="text-slate-600">
            Temukan jawaban atas pertanyaan umum seputar permohonan layanan, biaya, dan tata cara verifikasi.
          </p>
        </div>
      </ScrollReveal>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ScrollReveal key={faq.id} animation="fade-up" delay={idx * 60}>
              <div
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden transition-all duration-300 hover:shadow-card hover:border-primary-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left font-bold text-slate-800 text-base flex items-center justify-between gap-4 hover:text-primary-700 transition-colors duration-200 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-primary-600 font-mono text-xl transition-transform duration-300 ${openIdx === idx ? 'bg-primary-100 rotate-180' : 'bg-slate-100'}`}>
                    {openIdx === idx ? '−' : '+'}
                  </span>
                </button>

                {openIdx === idx && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
