import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Input } from './Input';
import { Button } from './Button';

const ServiceForm = ({ onClose, onSubmit }) => {
  const [service, setService] = useState({
    nome: '',
    duracao: '',
    preco: '',
    descricao: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...service,
      id: Date.now()
    });
    onClose();
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
        className="bg-white rounded-2xl p-6 w-full max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-xl font-semibold text-primary-800 mb-6">
          Novo Serviço
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome do Serviço"
            value={service.nome}
            onChange={(e) => setService({ ...service, nome: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duração (minutos)"
              type="number"
              min="1"
              value={service.duracao}
              onChange={(e) => setService({ ...service, duracao: e.target.value })}
              required
            />

            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              min="0"
              value={service.preco}
              onChange={(e) => setService({ ...service, preco: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              value={service.descricao}
              onChange={(e) => setService({ ...service, descricao: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Descreva o serviço..."
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">
              Salvar Serviço
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ServiceForm;