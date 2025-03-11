import { motion } from 'framer-motion';
import { FiX, FiStar, FiUser, FiClock, FiDollarSign } from 'react-icons/fi';
import { Button } from './Button';

const ServiceDetailModal = ({ service, onClose, onEdit }) => {
  // Mock data - in a real app, this would come from your backend
  const lastClients = [
    { id: 1, name: 'Maria Silva', date: '2024-02-20', rating: 5 },
    { id: 2, name: 'João Santos', date: '2024-01-15', rating: 4 },
  ];

  const statistics = {
    averageRating: 4.5,
    totalAppointments: 28,
    popularTimes: ['14:00', '16:00'],
    averageDuration: '45 min'
  };

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
            <h2 className="text-2xl font-bold text-primary-800">{service.nome}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center text-gray-600">
              <FiClock className="mr-1" />
              {service.duracao} min
            </span>
            <span className="flex items-center text-gray-600">
              <FiDollarSign className="mr-1" />
              R$ {parseFloat(service.preco).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Descrição */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p className="text-gray-700">{service.descricao}</p>
          </div>

          {/* Estatísticas */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Avaliação Média</p>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-semibold mr-2">{statistics.averageRating}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < statistics.averageRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total de Agendamentos</p>
                <p className="text-lg font-semibold">{statistics.totalAppointments}</p>
              </div>
            </div>
          </div>

          {/* Últimos Clientes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Últimos Clientes</h3>
            <div className="space-y-3">
              {lastClients.map(client => (
                <div
                  key={client.id}
                  className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      <FiUser className="inline mr-2" />
                      {client.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(client.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: client.rating }).map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <Button onClick={onEdit}>
              Editar Serviço
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

export default ServiceDetailModal;