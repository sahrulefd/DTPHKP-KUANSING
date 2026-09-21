import { useState, useEffect } from 'react';
import { getFaqs } from '../../api/public';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';
import Modal from '../../components/common/Modal';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({ question: '', answer: '', category: 'Umum', sort_order: 1, is_active: true });

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

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ question: '', answer: '', category: 'Umum', sort_order: faqs.length + 1, is_active: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, category: faq.category || 'Umum', sort_order: faq.sort_order, is_active: faq.is_active });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/faqs/${editingId}`, form);
      } else {
        await api.post('/admin/faqs', form);
      }
      setModalOpen(false);
      setAlert({ type: 'success', message: 'FAQ berhasil disimpan.' });
      fetchFaqs();
    } catch {
      setAlert({ type: 'error', message: 'Gagal menyimpan FAQ.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus FAQ ini?')) return;
    try {
      await api.delete(`/admin/faqs/${id}`);
      setAlert({ type: 'success', message: 'FAQ dihapus.' });
      fetchFaqs();
    } catch {
      setAlert({ type: 'error', message: 'Gagal menghapus FAQ.' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola FAQ</h1>
          <p className="text-xs text-slate-500 mt-0.5">Pertanyaan yang sering diajukan oleh masyarakat</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>Tambah FAQ</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded uppercase">{faq.category}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{faq.question}</h4>
                <p className="text-xs text-slate-600 mt-1">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => handleOpenEdit(faq)} className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold">Edit</button>
                <button onClick={() => handleDelete(faq.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit FAQ' : 'Tambah FAQ Baru'}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">Pertanyaan *</label>
            <input type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" required />
          </div>
          <div>
            <label className="block font-bold mb-1">Jawaban *</label>
            <textarea rows={3} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" required></textarea>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1">Kategori</label>
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full p-2 rounded-xl border border-slate-300" />
            </div>
            <div>
              <label className="block font-bold mb-1">Urutan</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} className="w-full p-2 rounded-xl border border-slate-300" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-soft">Simpan FAQ</button>
        </form>
      </Modal>
    </div>
  );
}
