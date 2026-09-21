import { useState, useEffect } from 'react';
import { getGuides } from '../../api/public';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';
import Modal from '../../components/common/Modal';

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({ title: '', content: '', sort_order: 1, is_active: true });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const data = await getGuides();
      setGuides(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ title: '', content: '', sort_order: guides.length + 1, is_active: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (g) => {
    setEditingId(g.id);
    setForm({ title: g.title, content: g.content, sort_order: g.sort_order, is_active: g.is_active });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/guides/${editingId}`, form);
      } else {
        await api.post('/admin/guides', form);
      }
      setModalOpen(false);
      setAlert({ type: 'success', message: 'Panduan disimpan.' });
      fetchGuides();
    } catch {
      setAlert({ type: 'error', message: 'Gagal menyimpan panduan.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus panduan ini?')) return;
    try {
      await api.delete(`/admin/guides/${id}`);
      setAlert({ type: 'success', message: 'Panduan dihapus.' });
      fetchGuides();
    } catch {
      setAlert({ type: 'error', message: 'Gagal menghapus.' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Panduan Penggunaan</h1>
          <p className="text-xs text-slate-500 mt-0.5">Materi petunjuk teknis pengajuan online</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>Tambah Panduan</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {guides.map((g) => (
            <div key={g.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{g.title}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{g.content}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => handleOpenEdit(g)} className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold">Edit</button>
                <button onClick={() => handleDelete(g.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Panduan' : 'Tambah Panduan'}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">Judul Panduan *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" required />
          </div>
          <div>
            <label className="block font-bold mb-1">Isi Konten *</label>
            <textarea rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" required></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-soft">Simpan Panduan</button>
        </form>
      </Modal>
    </div>
  );
}
