import { useState, useEffect } from 'react';
import { getSettings } from '../../api/public';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const fetchSettingsData = async () => {
    try {
      const data = await getSettings();
      setSettings(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);

    try {
      await api.post('/admin/settings', { settings });
      setAlert({ type: 'success', message: 'Pengaturan situs berhasil diperbarui.' });
    } catch {
      setAlert({ type: 'error', message: 'Gagal memperbarui pengaturan.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card max-w-3xl space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Pengaturan Situs & Kontak Dinas</h1>
        <p className="text-xs text-slate-500 mt-0.5">Kelola informasi publik, alamat kantor, hotline, dan link Survei Kepuasan Masyarakat (SKM)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold uppercase mb-1 text-slate-700">Nama Dinas Resmi</label>
          <input
            type="text"
            name="dinas_name"
            value={settings.dinas_name || ''}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
          />
        </div>

        <div>
          <label className="block font-bold uppercase mb-1 text-slate-700">Alamat Lengkap Kantor</label>
          <textarea
            name="office_address"
            rows={2}
            value={settings.office_address || ''}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold uppercase mb-1 text-slate-700">Hotline / WhatsApp</label>
            <input
              type="text"
              name="office_phone"
              value={settings.office_phone || ''}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold uppercase mb-1 text-slate-700">Email Resmi</label>
            <input
              type="email"
              name="office_email"
              value={settings.office_email || ''}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold uppercase mb-1 text-slate-700">Instagram Resmi</label>
            <input
              type="text"
              name="office_instagram"
              value={settings.office_instagram || ''}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold uppercase mb-1 text-slate-700">Jam Operasional</label>
            <input
              type="text"
              name="office_hours"
              value={settings.office_hours || ''}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-900 uppercase">Pengaturan Survei SKM (Portal SKM.GO.ID)</h4>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">URL Portal Survei SKM (SKM.GO.ID)</label>
            <input
              type="url"
              name="survey_url"
              value={settings.survey_url || ''}
              onChange={handleChange}
              placeholder="https://forms.google.com/..."
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-soft"
        >
          {submitting ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </form>
    </div>
  );
}
