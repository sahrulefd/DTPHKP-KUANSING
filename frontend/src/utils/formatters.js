/**
 * Formatters — Fungsi utilitas untuk formatting data
 */

/**
 * Format tanggal ke format Indonesia.
 * @param {string} dateString - ISO date string
 * @returns {string} - "4 Agustus 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format tanggal dan waktu ke format Indonesia.
 * @param {string} dateString - ISO date string
 * @returns {string} - "4 Agustus 2026, 10:30"
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format ukuran file ke format yang mudah dibaca.
 * @param {number} bytes
 * @returns {string} - "2.5 MB"
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

/**
 * Format tracking number.
 * @param {string} trackingNumber
 * @returns {string} - "SUB-20260804-0001"
 */
export const formatTrackingNumber = (trackingNumber) => {
  return trackingNumber || '-';
};

/**
 * Truncate text.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
