import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../api/services';
import { deleteService } from '../../api/admin';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;

    try {
      await deleteService(id);
      setAlert({ type: 'success', message: 'Layanan berhasil dihapus.' });
      fetchServices();
    } catch {
      setAlert({ type: 'error', message: 'Gagal menghapus layanan.' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Layanan Publik</h1>
          <p className="text-xs text-slate-500 mt-0.5">Tambah, edit, atau nonaktifkan katalog pelayanan publik DTPHKP</p>
        </div>

        <Link
          to="/admin/layanan/tambah"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shrink-0 inline-flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>Tambah Layanan Baru</span>
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Urutan</th>
                <th className="p-3">Nama Layanan</th>
                <th className="p-3">Jangka Waktu</th>
                <th className="p-3">Biaya</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-slate-500">{srv.sort_order}</td>
                  <td className="p-3 font-bold text-slate-900">{srv.name}</td>
                  <td className="p-3 text-slate-600">{srv.duration}</td>
                  <td className="p-3 text-green-700 font-semibold">{srv.cost}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${srv.is_active ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-600'}`}>
                      {srv.is_active ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      to={`/admin/layanan/edit/${srv.id}`}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] rounded-lg transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(srv.id)}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] rounded-lg transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
