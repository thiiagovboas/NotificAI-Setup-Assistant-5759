import { motion } from 'framer-motion';

const statusColors = {
  confirmado: 'bg-green-100 text-green-700 border-green-200',
  pendente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  cancelado: 'bg-red-100 text-red-700 border-red-200',
  concluido: 'bg-blue-100 text-blue-700 border-blue-200'
};

const StatusBadge = ({ status, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        border cursor-pointer transition-colors
        ${statusColors[status]}
      `}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.button>
  );
};

export default StatusBadge;