import { motion } from 'framer-motion';
import { FiX, FiStar, FiCalendar, FiMessageCircle } from 'react-icons/fi';
import { Button } from './Button';

const ClientDetailModal = ({ client, onClose, onEdit }) => {
  // Mock data - in a real app, this would come from your backend
  const lastServices = [
    { id: 1, name: 'Corte de Cabelo', date: '2024-02-20', rating: 5 },
    { id: 2, name: 'Barba', date: '2024-01-15', rating: 4 },
  ];

  const comments = [
    { id: 1, text: 'Cliente pontual e agradável', date: '2024-02-20' },
    { id: 2, text: 'Preferência por cortes modernos', date: '2024-01-15' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-primary-800">{client.nome}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 mt-1">
            Cliente desde {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Informações de Contato</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="text-gray-700">{client.telefone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700">{client.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Nascimento</p>
                <p className="text-gray-700">
                  {new Date(client.dataNascimento).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          {/* Últimos Serviços */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Últimos Serviços</h3>
            <div className="space-y-3">
              {lastServices.map(service => (
                <div
                  key={service.id}
                  className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{service.name}</p>
                    <p className="text-sm text-gray-500">
                      <FiCalendar className="inline mr-1" />
                      {new Date(service.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: service.rating }).map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comentários */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Observações</h3>
            <div className="space-y-3">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMessageCircle className="text-primary-600" />
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <Button onClick={onEdit}>
              Editar Cliente
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClientDetailModal;