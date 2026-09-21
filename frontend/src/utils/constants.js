/**
 * Constants — Nilai-nilai konstan aplikasi
 */

// Status pengajuan
export const SUBMISSION_STATUS = {
  MENUNGGU_VERIFIKASI: 'menunggu_verifikasi',
  DIPROSES: 'diproses',
  DITOLAK: 'ditolak',
  SELESAI: 'selesai',
};

// Label status (untuk display)
export const STATUS_LABELS = {
  menunggu_verifikasi: 'Menunggu Verifikasi',
  diproses: 'Diproses',
  ditolak: 'Ditolak',
  selesai: 'Selesai',
};

// Warna status (Tailwind classes)
export const STATUS_COLORS = {
  menunggu_verifikasi: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-300',
    dot: 'bg-amber-500',
  },
  diproses: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    dot: 'bg-blue-500',
  },
  ditolak: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    dot: 'bg-red-500',
  },
  selesai: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    dot: 'bg-green-500',
  },
};

// Role
export const ROLES = {
  MASYARAKAT: 'masyarakat',
  ADMIN: 'admin',
};

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_LABEL: '5MB',
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  ALLOWED_EXTENSIONS: '.pdf,.jpg,.jpeg,.png',
  ALLOWED_LABEL: 'PDF, JPG, PNG',
};

// Nama aplikasi
export const APP_NAME = 'DTPHKP Pelayanan';
export const APP_FULL_NAME = 'Sistem Informasi Pelayanan dan Administrasi';
export const DINAS_NAME = 'Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan';
export const KABUPATEN_NAME = 'Kabupaten Kuantan Singingi';
