import { FiCheck } from 'react-icons/fi';

const statusOptions = {
  pendente: { label: 'Pendente', color: 'yellow' },
  confirmado: { label: 'Confirmado', color: 'green' },
  concluido: { label: 'Concluído', color: 'blue' },
  cancelado: { label: 'Cancelado', color: 'red' }
};

const StatusDropdown = ({ status, onChange }) => {
  const getStatusColor = (statusKey) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-700',
      green: 'bg-green-100 text-green-700',
      blue: 'bg-blue-100 text-blue-700',
      red: 'bg-red-100 text-red-700'
    };
    return colors[statusOptions[statusKey].color];
  };

  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={`
          appearance-none w-full px-3 py-1 rounded-full text-sm font-medium
          border cursor-pointer transition-colors
          ${getStatusColor(status)}
        `}
      >
        {Object.entries(statusOptions).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <FiCheck className={`w-4 h-4 ${getStatusColor(status)}`} />
      </div>
    </div>
  );
};

export default StatusDropdown;