import { STATUS_COLORS, STATUS_LABELS } from '../../utils/constants';

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    dot: 'bg-gray-500',
  };

  const label = STATUS_LABELS[status] || status;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${color.bg} ${color.text} ${color.border}`}>
      <span className={`w-2 h-2 rounded-full ${color.dot}`}></span>
      {label}
    </span>
  );
}
