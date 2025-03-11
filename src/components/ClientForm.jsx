import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Input } from './Input';
import { Button } from './Button';

const ClientForm = ({ onClose, onSubmit }) => {
  const [client, setClient] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    observacoes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...client,
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
          Novo Cliente
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            value={client.nome}
            onChange={(e) => setClient({ ...client, nome: e.target.value })}
            required
          />

          <Input
            label="Telefone"
            type="tel"
            value={client.telefone}
            onChange={(e) => setClient({ ...client, telefone: e.target.value })}
            placeholder="(00) 00000-0000"
            required
          />

          <Input
            label="E-mail"
            type="email"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
            required
          />

          <Input
            label="Data de Nascimento"
            type="date"
            value={client.dataNascimento}
            onChange={(e) => setClient({ ...client, dataNascimento: e.target.value })}
            required
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Observações
            </label>
            <textarea
              value={client.observacoes}
              onChange={(e) => setClient({ ...client, observacoes: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Adicione observações importantes..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">
              Salvar Cliente
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

export default ClientForm;