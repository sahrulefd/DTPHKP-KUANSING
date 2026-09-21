export default function Alert({ type = 'info', title, message, onClose }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[type] || styles.info} relative mb-4 animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          {title && <h4 className="font-semibold mb-1 text-sm">{title}</h4>}
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-4">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
