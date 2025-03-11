import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';

const ClientCard = ({ client, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-3 rounded-full">
            <FiUser className="text-primary-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{client.nome}</h3>
            <p className="text-sm text-gray-500">
              Cliente desde {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <FiPhone className="w-4 h-4" />
          <span className="text-sm">{client.telefone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FiMail className="w-4 h-4" />
          <span className="text-sm">{client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FiCalendar className="w-4 h-4" />
          <span className="text-sm">
            {new Date(client.dataNascimento).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientCard;