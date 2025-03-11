import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPlus } from 'react-icons/fi';
import ClientForm from '../components/ClientForm';
import Toast from '../components/Toast';
import FilterBar from '../components/FilterBar';
import ClientCard from '../components/ClientCard';
import ClientDetailModal from '../components/ClientDetailModal';
import { fakeClients } from '../data/fakeData';
import GradientButton from '../components/GradientButton';

const Clients = () => {
  const [clients, setClients] = useState(fakeClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAddClient = (newClient) => {
    setClients([...clients, newClient]);
    setToast({
      type: 'success',
      message: 'Cliente adicionado com sucesso!'
    });
  };

  const handleEditClient = (updatedClient) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    setToast({
      type: 'success',
      message: 'Cliente atualizado com sucesso!'
    });
    setSelectedClient(null);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
    setToast({
      type: 'warning',
      message: 'Cliente removido com sucesso!'
    });
    setSelectedClient(null);
  };

  const filteredClients = clients
    .filter(client => 
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compare = a.nome.localeCompare(b.nome);
      return sortOrder === 'asc' ? compare : -compare;
    });

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
          <ClientCard
            key={client.id}
            client={client}
            onClick={() => setSelectedClient(client)}
          />
        ))}
      </div>

      {showForm && (
        <ClientForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddClient}
        />
      )}

      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
        />
      )}
    </div>
  );
};

export default Clients;