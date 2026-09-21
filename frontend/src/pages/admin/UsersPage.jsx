import { useState, useEffect } from 'react';
import { getUsers, resetUserPassword } from '../../api/admin';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';
import Modal from '../../components/common/Modal';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState(null);

  // Reset Password Modal State
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('password123');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('password123');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers({ role: roleFilter, search });
      setUsers(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleOpenResetModal = (user) => {
    setSelectedUser(user);
    setNewPassword('password123');
    setNewPasswordConfirm('password123');
    setResetError('');
  };

  const handleCloseResetModal = () => {
    setSelectedUser(null);
    setResetError('');
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetError('');

    if (newPassword.length < 8) {
      setResetError('Kata sandi minimal berjumlah 8 karakter.');
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setResetError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setResetLoading(true);

    try {
      const res = await resetUserPassword(selectedUser.id, newPassword, newPasswordConfirm);
      setAlert({
        type: 'success',
        message: res.message || `Kata sandi untuk pengguna ${selectedUser.name} berhasil diperbarui!`,
      });
      handleCloseResetModal();
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) {
        const firstErrorKey = Object.keys(resp.errors)[0];
        setResetError(resp.errors[firstErrorKey][0]);
      } else {
        setResetError(resp?.message || 'Gagal mereset kata sandi pengguna.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}

      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Kelola Pengguna Sistem</h1>
        <p className="text-xs text-slate-500 mt-0.5">Daftar masyarakat dan administrator yang terdaftar</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRoleFilter('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              roleFilter === '' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Role
          </button>
          <button
            onClick={() => setRoleFilter('masyarakat')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              roleFilter === 'masyarakat' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Masyarakat
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              roleFilter === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Admin
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari NIK, Nama, Email..."
          className="px-4 py-2 text-xs rounded-xl border border-slate-300 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">NIK</th>
                <th className="p-3">Email</th>
                <th className="p-3">Telepon / HP</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-right">Aksi &amp; Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{u.name}</td>
                  <td className="p-3 font-mono text-slate-700">{u.nik}</td>
                  <td className="p-3 text-slate-600">{u.email}</td>
                  <td className="p-3 text-slate-600">{u.phone || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleOpenResetModal(u)}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition cursor-pointer hover:scale-105"
                      title="Reset Kata Sandi Pengguna"
                    >
                      <svg className="w-3.5 h-3.5 text-amber-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span>Reset Password</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Reset Password */}
      {selectedUser && (
        <Modal
          isOpen={Boolean(selectedUser)}
          onClose={handleCloseResetModal}
          title={`Reset Password: ${selectedUser.name}`}
        >
          <form onSubmit={handleResetSubmit} className="space-y-4 pt-1">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1 text-xs text-slate-600">
              <div><strong className="text-slate-800">Nama:</strong> {selectedUser.name}</div>
              <div><strong className="text-slate-800">NIK:</strong> <span className="font-mono">{selectedUser.nik}</span></div>
              <div><strong className="text-slate-800">Email:</strong> {selectedUser.email}</div>
            </div>

            {resetError && <Alert type="error" message={resetError} onClose={() => setResetError('')} />}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Kata Sandi Baru *</label>
                <button
                  type="button"
                  onClick={() => {
                    setNewPassword('password123');
                    setNewPasswordConfirm('password123');
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Isi Preset ("password123")
                </button>
              </div>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan kata sandi baru"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm text-slate-900 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Konfirmasi Kata Sandi Baru *</label>
              <input
                type="text"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder="Ulangi kata sandi baru"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm text-slate-900 font-mono"
                required
              />
            </div>

            <p className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2.5">
              <svg className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1.5v2" />
                <path d="M17.5 4l-1.4 1.4" />
                <path d="M20.5 8.5l-1.9 0.7" />
                <path d="M21.5 13h-2" />
                <path d="M19 17.5l-1.4-1.4" />
                <path d="M6.5 4l1.4 1.4" />
                <path d="M3.5 8.5l1.9 0.7" />
                <path d="M2.5 13h2" />
                <path d="M5 17.5l1.4-1.4" />
                <path d="M8.5 15.5C7.2 14.5 6.5 13 6.5 11.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 5.5 5.5c0 1.5-.7 3-2 4" />
                <path d="M9.5 9a2.5 2.5 0 0 1 2.5-2.5" />
                <path d="M9 16.5h6" />
                <path d="M9.5 18.8h5" />
                <path d="M10 21h4" />
                <path d="M10.5 22.5c.8.6 2.2.6 3 0" />
              </svg>
              <span>Kata sandi baru ini akan langsung aktif. Beritahukan kata sandi baru ini kepada pemilik akun.</span>
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCloseResetModal}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={resetLoading}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-soft hover:shadow-card transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {resetLoading ? (
                  <span>Menyimpan Password...</span>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Simpan Password Baru</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
