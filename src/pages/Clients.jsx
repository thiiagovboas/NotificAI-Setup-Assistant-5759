import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiCalendar, FiPlus } from 'react-icons/fi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Toast from '../components/Toast';
import FilterBar from '../components/FilterBar';
import GradientButton from '../components/GradientButton';
import ClientDetailModal from '../components/ClientDetailModal';
import { fakeClients } from '../data/fakeData';

const Clients = () => {
  const [clients, setClients] = useState(fakeClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredClients = clients
    .filter(client => 
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compare = a.nome.localeCompare(b.nome);
      return sortOrder === 'asc' ? compare : -compare;
    });

  const handleDelete = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
    setToast({
      type: 'warning',
      message: 'Cliente removido com sucesso!'
    });
  };

  return (
    <div className="p-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">Clientes</h1>
          <p className="text-gray-600">Gerencie seus clientes</p>
        </div>
        <GradientButton onClick={() => setShowForm(true)}>
          <FiPlus className="w-4 h-4" />
          Novo Cliente
        </GradientButton>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        sortOrder={sortOrder}
        onSortChange={(e) => setSortOrder(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedClient(client)}
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
        ))}
      </div>

      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onEdit={() => {
            // Handle edit functionality
            setSelectedClient(null);
          }}
          onDelete={() => {
            handleDelete(selectedClient.id);
            setSelectedClient(null);
          }}
        />
      )}
    </div>
  );
};

export default Clients;